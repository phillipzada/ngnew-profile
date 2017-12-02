import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class HomeService {

  private messages = [
    'Routing & Lazy Loading Rocks!',
    'Angular Testing is too cool',
    'This training course is awesome'
  ];
  private index = 0;

  constructor() { }

  getMessage() {
    const currentMessage = this.messages[this.index++];
    if (this.index > this.messages.length - 1) {
      this.index = 0;
    }
    return of(currentMessage);
  }

}
