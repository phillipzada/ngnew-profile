import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HomeService {

  constructor() { }

  getMessage() {
    return of('Routing &amp; Lazy Loading Rocks!');
  }

}
