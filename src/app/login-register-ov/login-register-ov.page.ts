import { Component, OnInit, ViewChild } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { Storage } from '@ionic/storage';
//var admin = require('firebase-admin');


@Component({
  selector: 'app-login-register-ov',
  templateUrl: './login-register-ov.page.html',
  styleUrls: ['./login-register-ov.page.scss'],
})
export class LoginRegisterOvPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, public router: Router, private androidFullScreen: AndroidFullScreen,
    private _afData: AngularFirestore, private _alert: AlertController, private _storage: Storage){
    this.androidFullScreen.isImmersiveModeSupported()
      .then(() => console.log('Immersive mode supported'))
      .catch(err => console.log(err));
   /*if(this.logedIn()){
      this.router.navigateByUrl('/home');
    } */


  }



  /*public uid; */
  public email: string;
  public pass: string;


  ngOnInit() {
  }

  /*logedIn(){
    var uid;
    this.afAuth.auth.currentUser.getIdToken(true).then(function(idToken) {
      admin.auth().verifyIdToken(idToken).then(function(decodedToken) {
        //uid = decodedToken.uid;
      });
      console.log(idToken);
    });
    if(uid){
      return true;
    }else {
      return false;
    }
  } */

  async directLogin(){
    if(await this._storage.get("remember") == true){
      console.log(await this._storage.get("remember"));
    let mail = await this._storage.get("email");
    let pass = await this._storage.get("password");
    return this.afAuth.auth.signInWithEmailAndPassword(mail, pass).then(
      () => {
        this.router.navigateByUrl('/tabs/tabs/home');
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
  }

  facebookAuth(){

    let provider = new auth.FacebookAuthProvider();
    provider.addScope("email, user_gender, user_birthday, phoneNumber");

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

    provider.addScope("email");
      this.afAuth.auth.signInWithPopup(provider).then(
        (result) => {
          console.log(result);
          var userId = this.afAuth.auth.currentUser.uid;
          var userData = this._afData.collection('user').doc(userId).set({
            email: result.additionalUserInfo.profile["email"],
            //gender: result.additionalUserInfo.profile["user_gender"],
            //birthday: result.additionalUserInfo.profile['birthday'],
            name: result.additionalUserInfo.profile["family_name"],
            prename: result.additionalUserInfo.profile["given_name"]
      }).then(function() {
        this.router.navigateByUrl('/add-partner');
        }
      );
  });
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
