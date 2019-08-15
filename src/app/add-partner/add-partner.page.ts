import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx'
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.page.html',
  styleUrls: ['./add-partner.page.scss'],
})
export class AddPartnerPage implements OnInit {

  public ownCode: string;
  public partnerCode: string;
  barcodeScannerOptions: BarcodeScannerOptions;

  constructor(private _bcScan: BarcodeScanner, private _auth: AngularFireAuth) { 
      //this.ownCode = this._auth.auth.currentUser.uid;
      this.ownCode = "ABC";
      this.barcodeScannerOptions = {
        showTorchButton: true,
        showFlipCameraButton: true
      };
      this.encodeText();
   }

  ngOnInit() {
  }

  scanCode(){
    this._bcScan
      .scan()
      .then(barcodeData => {
        console.log(barcodeData);
      });
  }

  encodeText(){
    this._bcScan.encode(this._bcScan.Encode.TEXT_TYPE, this.ownCode).then(encodedData =>{
      console.log(encodedData);
      this.ownCode = encodedData;
    })
  }



}
