import { MaterialModule } from '../lib/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule
  ],
  declarations: [UserProfileComponent],
  exports: [UserProfileComponent]
})
export class UserModule { }
