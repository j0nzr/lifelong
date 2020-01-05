import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public uid;
  public jahrestag;

  constructor(private _afAuth: AngularFireAuth, private _router: Router, private _store: Storage,
    private _onlineStore: AngularFirestore, private alertCtrl: AlertController) {
      this.uid = this._afAuth.auth.currentUser.uid;
     }

  ngOnInit() {
  }

  async logOut(){
    await this._afAuth.auth.signOut();
    this._store.remove("email");
    this._store.remove("pass");
    this._store.set("remember", false);
    this._router.navigateByUrl('/login-register-ov');
  }

  private deletePartner(partnersCode: string){
      let partnerId = "";
      let me = this._onlineStore.collection('user').doc(this.uid);
      me.get().subscribe((result) => {
        let partnerId =  result.data().partner;
      });
      me.update({
        partner: ""
      });
      this._onlineStore.collection('user').doc(partnerId).update({
        partner: ""
      });
      alert("Bitte starte die App neu!");
  }

  private async changeJahrestag(partnersCode: string){
      const alert = await this.alertCtrl.create({
        header: 'Jahrestag ändern',
        inputs: [
          {
            name: 'jahrestag',
            type: 'date'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              //console.log('Cancel clicked');
            }
          },
          {
            text: 'Bestätigen',
            handler: data => {
              this.jahrestag = data.jahrestag;
            }
          }
        ]
      });
      await alert.present();

    let me = this._onlineStore.collection('user').doc(this.uid);
    me.update({
      jahrestag: this.jahrestag
    });
    //alert("Bitte starte die App neu!");
}

  datenschutz(){
    this._router.navigateByUrl('/datenschutz');
  }

  home(){

  }

}
