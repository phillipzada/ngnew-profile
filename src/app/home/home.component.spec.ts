import { MaterialModule } from '../lib/material/material.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { of } from 'rxjs/observable/of';

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

});
