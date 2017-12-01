import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;

  constructor() { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.user = {
      firstName: 'Kal',
      lastName: 'El',
      displayName: 'Clark Jonathan Kent'
    };
  }

}
