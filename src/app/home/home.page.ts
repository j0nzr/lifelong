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

  constructor(private _router: Router, private _afData: AngularFirestore, private _afAuth: AngularFireAuth) {
    this.hasPartner(this._afAuth.auth.currentUser);
    this.testDone(this._afAuth.auth.currentUser);
  }

  ionViewDidLoad(){
    this.hasPartner(this._afAuth.auth.currentUser);
    this.testDone(this._afAuth.auth.currentUser);
  }

  public test: any;
  public partner: boolean;



  async addPartner(){
    console.log("add partner");
    if(this.partner == false){
      this._router.navigateByUrl('/add-partner');
    }
  }

  hasPartner(user){
    let partner = false;
    let data = this._afData.collection('user').doc(user.uid).get().subscribe(
      (result) => {
        if(result.data().partner != ""){
          partner = true;
        }else{
          partner = false;
        }
        this.partner = partner;
      }
    );
    
  }

  async testDone(user){
    let test = false;
    let data = await this._afData.collection('user').doc(user.uid).get().subscribe(
      (result) => {
        test = result.data().test;
        this.test = test;
      }
    );
    
  }

  settings(){
    this._router.navigateByUrl('/settings');
  }

  toTest(){
    this._router.navigateByUrl('/test');
  }

}
