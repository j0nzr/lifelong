import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

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

  constructor(public nav: Router, private _location: Location, private afAuth: AngularFireAuth, private afData: AngularFirestore) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var input = document.getElementById('profilePicture');
}

  backButton(){
    this._location.back();
  }

  async registerUser(){
    let nav = this.nav;
      await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      var userId = this.afAuth.auth.currentUser.uid;
      var userData = this.afData.collection('user').doc(userId).set({
        email: this.email,
        gender: this.gender,
        name: this.name,
        prename: this.prename
      }).then(function() {
        nav.navigateByUrl('/add-partner');
      });
  }

    upload(event) {
      console.log(event)
  }

  uploadButton(){
    console.log(document.getElementById('profilePicture'));
    console.log(document.getElementById('profilePicture').click());
  }

}
