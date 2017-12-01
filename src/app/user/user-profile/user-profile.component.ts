import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as UserActions from '../+state/user.actions';
import * as UserSelectors from '../+state/user.selectors';
import { State } from '../models/state';

@Component({
  selector: 'ngp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  loading = false;
  saving = false;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.createForm();

    this.store.select(UserSelectors.selectUser)
      .subscribe(user => {
        if (user) {
          this.userForm.patchValue(user);
        }
        this.loading = false;
      });

  }

  getUser(userId: number) {
    this.loading = true;
    this.store.dispatch(new UserActions.GetAction(userId));
  }

  createForm() {
    this.userForm = this.formBuilder.group({
      createUser: true,
      userId: [null],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      displayName: null
    });
  }

  prepareUser(): User {
    const userModel = this.userForm.value;

    const saveUser: User = {
      userId: userModel.createUser ? 0 : userModel.userId,
      firstName: userModel.firstName,
      lastName: userModel.lastName,
      displayName: userModel.displayName
    };
    return saveUser;
  }

  onSubmit() {
    this.saving = true;
    const user = this.prepareUser();
    this.store.dispatch(new UserActions.SaveAction(user));
  }

}
