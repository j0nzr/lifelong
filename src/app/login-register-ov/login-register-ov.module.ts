import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginRegisterOvPage } from './login-register-ov.page';

const routes: Routes = [
  {
    path: '',
    component: LoginRegisterOvPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginRegisterOvPage]
})
export class LoginRegisterOvPageModule {}
