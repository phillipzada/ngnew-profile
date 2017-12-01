import { User } from './models/user';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  constructor() {}

  getUser(): User {
    return {
      firstName: 'Kal',
      lastName: 'El',
      displayName: 'Clark Jonathan Kent'
    };
  }
}
