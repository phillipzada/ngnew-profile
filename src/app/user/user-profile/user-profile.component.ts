import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as UserActions from '../+state/user.actions';
import * as UserSelectors from '../+state/user.selectors';
import { State } from '../models/state';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  loading = false;
  saving = false;
  error$: Observable<string>;
  userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<State>,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();

    this.store.select(UserSelectors.selectUser)
      .subscribe((user: any) => {
        if (user) {
          if (user.userId && user.userId !== this.userId) {
            this.router.navigate(['/user/profile', user.userId]);
          }
          user.createUser = false;
          this.userForm.patchValue(user);
          this.userId = user.userId;
        }
      });

    this.store.select(UserSelectors.selectLoading)
      .subscribe(loading => this.loading = loading);

    this.store.select(UserSelectors.selectSaving)
      .subscribe(saving => this.saving = saving);

    this.error$ = this.store.select(UserSelectors.selectError);

    this.activatedRoute.params.subscribe(params => {
      const id = +params['id']; // (+) converts string 'id' to a number
      if (id) {
        this.store.dispatch(new UserActions.GetAction(id));
      }
    });
  }

  getUser(userId: number) {
    this.router.navigate(['/user/profile', userId]);
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
    const user = this.prepareUser();
    this.store.dispatch(new UserActions.SaveAction(user));
  }

}
