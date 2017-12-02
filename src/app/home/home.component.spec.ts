import { HomeComponent } from './home.component';
import { HomeService } from './home.service';
import { of } from 'rxjs/observable/of';

describe(`Component: Home Component`, () => {
    let component: HomeComponent = null;
    let homeService: HomeService;

    beforeEach(() => {
        homeService = {
            getMessage: () => of('REAL MESSAGE')
        };

        component = new HomeComponent(homeService);
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

});
