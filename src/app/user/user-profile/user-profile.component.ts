import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  userId = 1;
  loading = false;
  saving = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}


  ngOnInit() {
    this.createForm();
    this.getUser();
  }

  getUser() {
    this.loading = true;
    this.userService.getUser(this.userId).subscribe(user => {
      this.userForm.patchValue(user);
      this.loading = false;
    });
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      displayName: ''
    });
  }

  prepareUser(): User {
    const userModel = this.userForm.value;
    const saveUser: User = {
      userId: this.userId,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      displayName: userModel.displayName
    };
    return saveUser;
  }

  onReset() {
    this.getUser();
  }

  onSubmit() {
    this.saving = true;
    const user = this.prepareUser();
    this.userService.editUser(user).subscribe(_ => {
      this.saving = false;
    });
  }

}
