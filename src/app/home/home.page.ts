import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private _router: Router, private _afData: AngularFirestore, private _afAuth: AngularFireAuth) {}

  async addPartner(){
      //this._router.navigateByUrl('/add-partner');
      console.log("Partner:", this.hasPartner(await this._afAuth.auth.currentUser))
  }

  async hasPartner(user){
    let partner = false;
    let data = await this._afData.collection('user').doc(user.uid);
    //data.get().then();
  }

}
