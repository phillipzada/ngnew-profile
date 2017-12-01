import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../lib/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent],
  providers: [UserService]
})
export class UserModule { }
