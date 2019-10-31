import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private _afAuth: AngularFireAuth, private _router: Router) { }

  ngOnInit() {
  }

  async logOut(){
    await this._afAuth.auth.signOut();
    this._router.navigateByUrl('/login-register-ov');
  }

}
