
import { MaterialModule } from '../lib/material/material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { of } from 'rxjs/observable/of';

import { map, take } from 'rxjs/operators';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { async as scheduler } from 'rxjs/scheduler/async';
import { timer } from 'rxjs/observable/timer';

describe(`Component: Home Component`, () => {
    let component: HomeComponent = null;
    let homeService: HomeService;
    let fixture: ComponentFixture<HomeComponent>;
    let de: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [HomeComponent],
            imports: [MaterialModule],
            providers: [
                HomeService
            ]
        });

        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        homeService = TestBed.get(HomeService);
        de = fixture.debugElement;
    });

    it('add 1 + 1', () => {
        expect(1 + 1).toEqual(2);
    });

    it('should have a message of "Routing &amp; Lazy Loading Rocks!"', () => {
        expect(component.message).toEqual('Routing &amp; Lazy Loading Rocks!');
    });

    it('should set the message property when component intiialised', () => {
        spyOn(homeService, 'getMessage')
            .and.returnValue(of('FAKE MESSAGE'));

        component.ngOnInit();

        expect(component.message).toEqual('FAKE MESSAGE');
    });

    it(`should have message bound onto the page`, () => {
        spyOn(homeService, 'getMessage')
            .and.returnValue(of('FAKE MESSAGE'));

        fixture.detectChanges();

        const el = de.query(By.css('h1')).nativeElement;

        expect(el.innerText).toEqual('FAKE MESSAGE');
    });

    it(`should get next message on click - with fakeAsync`, fakeAsync(() => {
        spyOn(homeService, 'getMessage')
            .and.returnValues(
            of('FAKE MESSAGE 1'),
            timer(2000, scheduler).pipe(take(1), map(x => 'FAKE MESSAGE 2')));

        fixture.detectChanges();

        const el = de.query(By.css('h1')).nativeElement;

        expect(el.innerText).toEqual('FAKE MESSAGE 1');

        const button = fixture.debugElement.query(By.css('button')).nativeElement;
        button.click();

        tick(3000);

        fixture.detectChanges();

        expect(el.innerText).toEqual('FAKE MESSAGE 2');
    }));

    it(`should get next message on click - with async`, async(() => {
        spyOn(homeService, 'getMessage')
            .and.returnValues(
            of('FAKE MESSAGE 1'),
            timer(2000, scheduler).pipe(take(1), map(x => 'FAKE MESSAGE 2')));

        fixture.detectChanges();

        const el = de.query(By.css('h1')).nativeElement;

        expect(el.innerText).toEqual('FAKE MESSAGE 1');

        const button = fixture.debugElement.query(By.css('button')).nativeElement;
        button.click();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(el.innerText).toEqual('FAKE MESSAGE 2');
        });

    }));

    it('should get next message on click - with done', (done) => {
        const spy = spyOn(homeService, 'getMessage')
            .and.returnValues(
            of('FAKE MESSAGE 1'),
            timer(2000, scheduler).pipe(take(1), map(x => 'FAKE MESSAGE 2')));

        fixture.detectChanges();
        const el = de.query(By.css('h1')).nativeElement;

        expect(el.innerText).toEqual('FAKE MESSAGE 1');

        const button = fixture.debugElement.query(By.css('button')).nativeElement;
        button.click();

        spy.calls.mostRecent().returnValue
            .subscribe(() => {
                fixture.detectChanges();
                expect(el.innerText).toEqual('FAKE MESSAGE 2');
                done();
            });

    });

});
