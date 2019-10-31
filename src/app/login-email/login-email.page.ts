import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {

  constructor( private _location: Location, private _auth: AngularFireAuth, private _router: Router,
    private _afData: AngularFirestore, private _alert: AlertController, private _storage: Storage) { }


  private email: string;
  private password: string;
  private remember: boolean;

  ngOnInit() {
  }

  backButton(){
      this._location.back();
  }

  async login(){
    if(this.remember){
      this._storage.set("remember", true);
      this._storage.set("email", this.email);
      this._storage.set("pass", this.password);
    }
    return this._auth.auth.signInWithEmailAndPassword(this.email, this.password).then(
      () => {
        if(this.hasPartner(this._auth.auth.currentUser)){
          this._router.navigateByUrl('/tabs/tabs/home');
        }else{
          this._router.navigateByUrl('/add-partner');
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

  passwordLost(){
    this._router.navigateByUrl('/password-reset');
  }

  async hasPartner(user){
    let partner = false;
    let data = await this._afData.collection('user').doc(user.uid).get();
    data.subscribe(x => {
      if(x.data()["partner"]){
        partner = true
      }
    });
    return partner
  }

}
