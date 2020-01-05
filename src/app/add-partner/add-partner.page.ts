import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx'
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { ToastController } from 'ionic-angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.page.html',
  styleUrls: ['./add-partner.page.scss'],
})
export class AddPartnerPage implements OnInit {

  public icon: string = "barcode";
  public uid = this._auth.auth.currentUser.uid;
  public ownCode: string;
  public partnerCode: string;
  public barcodePartner: string;
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private _bcScan: BarcodeScanner, private _auth: AngularFireAuth,
    private _store: AngularFirestore, private _nav: Router, public _data: AngularFireDatabase, private _share: SocialSharing) {
      this.ownCode = this.randomCode();
      this._store.collection('user').doc(this.uid).set({
        partnerCode: this.ownCode
      },{merge: true});
   }

  ngOnInit() {
  }

  scanCode(){
    var partnersCode;
    if(!this.partnerCode){
    this._bcScan
      .scan()
      .then(barcodeData => {
        this.findPartnerByPartnerCode(barcodeData.text);
      });
    }else{
      this.findPartnerByPartnerCode(this.partnerCode);
    }
  }

  encodeText(){
    this._bcScan.encode(this._bcScan.Encode.TEXT_TYPE, this.ownCode).then(encodedData =>{
      console.log(encodedData);
      this.ownCode = encodedData;
    })
  }

  inputChange(){
    if(this.partnerCode){
      this.icon="send";
    }else{
      this.icon = "barcode";
    }
  }

  private randomCode(len: number = 6): string{
    var text="";

    let charset = "ABCDEFGHJKLMNPQRSTUVWXYZ123456789";

    for (var i = 0; i < len; i++){
      text += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return text;
  }

  private findPartnerByPartnerCode(partnersCode: string){
    var partnerName;
      let partner = this._store.collection('user', ref => ref.where('partnerCode', '==', partnersCode));
        partner.get().subscribe(result => {
          result.forEach((doc) => {
            this._store.collection('user').doc(this.uid).update({
              partner: doc.id
            });
            this._store.collection('user').doc(doc.id).update({
              partner: this.uid
            });
            partnerName = doc.data().prename + ' ' + doc.data().name;
            this.home();
          });
        });;

  }

  public home(){
    this._nav.navigateByUrl('/tabs/tabs/home');
  }

  public async later(){
    let partner = await this._store.collection('user').doc(this.uid).get().subscribe(data => {
      if(data.data().test){
        this._nav.navigateByUrl('/tabs/tabs/home');
      }else{
        this._nav.navigateByUrl('/test');
      }
    });
    //console.log(partner);
  }

  shareCode(){
    this._share.share("Füge mich als dein Partner in der Lifelong App hinzu: " + this.ownCode);
  }

}
