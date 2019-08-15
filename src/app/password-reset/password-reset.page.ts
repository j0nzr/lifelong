import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { Location } from '@angular/common';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.page.html',
  styleUrls: ['./password-reset.page.scss'],
})
export class PasswordResetPage implements OnInit {

  public email: string;

  constructor(private _auth: AngularFireAuth, private _location: Location) { }

  ngOnInit() {
  }

  resetPass(){
    this._auth.auth.sendPasswordResetEmail(this.email);
  }

  backButton(){
      this._location.back();
  }

}
