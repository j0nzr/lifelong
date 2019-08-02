import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxAuthFirebaseUIModule, AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { RegisterPage } from '../register/register.page';
import { Router } from '@angular/router';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';



@Component({
  selector: 'app-login-register-ov',
  templateUrl: './login-register-ov.page.html',
  styleUrls: ['./login-register-ov.page.scss'],
})
export class LoginRegisterOvPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, private androidFullScreen: AndroidFullScreen){
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));

  }

  ngOnInit() {
  }

  

  facebookAuth(){
    this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  googleAuth(){
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  login(){
    this.router.navigateByUrl('/login-email');
  }

}
