import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxAuthFirebaseUIModule, AuthProvider, Theme } from 'ngx-auth-firebaseui';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { FacebookAuthProvider } from '@firebase/auth-types';



@Component({
  selector: 'app-login-register-ov',
  templateUrl: './login-register-ov.page.html',
  styleUrls: ['./login-register-ov.page.scss'],
})
export class LoginRegisterOvPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, private androidFullScreen: AndroidFullScreen,
    private _afData: AngularFirestore, private _alert: AlertController){
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));

  }

  ngOnInit() {
  }

  

  facebookAuth(){

    let provider = new auth.FacebookAuthProvider();
    provider.addScope("user_birthday, email, user_gender");

    this.afAuth.auth.signInWithPopup(provider).then(
      (result) => {
        console.log(result);
        console.log(this.hasPartner(this.afAuth.auth.currentUser));

        if(this.hasPartner(this.afAuth.auth.currentUser)){
          this.router.navigateByUrl('/home');
        }else{
          var userId = this.afAuth.auth.currentUser.uid;
          var userData = this._afData.collection('user').doc(userId).set({
            email: result.additionalUserInfo.profile["email"],
        gender: result.additionalUserInfo.profile["user_gender"],
        name: result.additionalUserInfo.profile["last_name"],
        prename: result.additionalUserInfo.profile["first_name"]
      }).then(function() {
        this.router.navigateByUrl('/add-partner');
      });
        }
      },
      (err)=>{
        const alert = this._alert.create({
          header: 'Login Fehler',
          message: err,
          buttons: ['Okay']
        });
        alert.then((_alert: any)=>{
          _alert.present();
        });
      }
    );
  }

  googleAuth(){
    let provider = new auth.GoogleAuthProvider();

    provider.addScope("email");
      this.afAuth.auth.signInWithPopup(provider).then(
        (result) => {
          console.log(result);
        }
      );
  }

  register(){
    this.router.navigateByUrl('/register');
  }

  login(){
    this.router.navigateByUrl('/login-email');
  }

  hasPartner(user){
    let partner = false;
    /*let data = await this._afData.collection('user').doc(user.uid).get();
    data.subscribe(x => {
      if(x.data().keys().find('partner')){
        partner = true
      }
    }); */
    return partner
  }

}
