import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private _afAuth: AngularFireAuth, private _router: Router, private _store: Storage) { }

  ngOnInit() {
  }

  async logOut(){
    await this._afAuth.auth.signOut();
    this._store.remove("email");
    this._store.remove("pass");
    this._store.set("remember", false);
    this._router.navigateByUrl('/login-register-ov');
  }

}
