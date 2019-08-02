import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { auth, database } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as firebase from 'firebase';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public prename: string;
  public name: string;
  public email: string;
  public password: string;
  public gender: string;
  public birth: string;

  constructor(public nav: Router, private _location: Location, private afAuth: AngularFireAuth, private afData: AngularFireDatabase) { }

  ngOnInit() {
  }

  backButton(){
    this._location.back();
  }

  registerUser(){
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      var userId = this.afAuth.auth.currentUser.uid;
      var userData = this.afData.database.ref('users/'+userId);
      console.log(userData);
  }

}
