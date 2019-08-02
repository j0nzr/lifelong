import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgxAuthFirebaseUIModule, AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

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
    RouterModule.forChild(routes),
    NgxAuthFirebaseUIModule
  ],
  declarations: [LoginRegisterOvPage]
})
export class LoginRegisterOvPageModule{

}
