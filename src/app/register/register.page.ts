import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController, ToastController, ModalController } from '@ionic/angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { storage } from 'firebase';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/observable';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ElementRef } from '@angular/core';


declare var require;
const normalizeURL = require('normalize-url');

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {


  //public prename: string;
  //public name: string;
  public email: string;
  public password: string;
  //public gender: string;
  //public birth: string;
  //public profilePic: any;
  //public genderIcon: string = "female";
  public jahrestag: string;
  public files: Observable<any[]>;

  constructor(public nav: Router, private _location: Location, private afAuth: AngularFireAuth,
    private afData: AngularFirestore, private _storage: AngularFireStorage, private toastCtrl:
    ToastController, 
    //private imagePicker: ImagePicker,
    //private camera: Camera,
    private modalController:
    ModalController, private dataService: DataService, private alertCtrl: AlertController) {
      //this.files = this.dataService.getFiles();
    }

  ngOnInit() {
  }
  ngAfterViewInit() {
    var input = document.getElementById('profilePicture');
}

  backButton(){
    this._location.back();
  }

  /*maleFemaleChange(){
    if(this.gender == "m"){
      this.genderIcon = "male";
    }else{
      this.genderIcon="female";
    }
  } */

  async registerUser(){
    let nav = this.nav;
      await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      var userId = this.afAuth.auth.currentUser.uid;
      /*if (!this.profilePic){
        this.profilePic = "";
      } */
      if(this.jahrestag){
      var userData = this.afData.collection('user').doc(userId).set({
        email: this.email,
        /*gender: this.gender,
        name: this.name,
        prename: this.prename,
        birth: this.birth,
        profilePic: this.profilePic, */
        jahrestag: this.jahrestag,
        test: false,
        partner: false
      }).then(function() {
        nav.navigateByUrl('/add-partner');
      });
    }else{
      var userData = this.afData.collection('user').doc(userId).set({
        email: this.email,
        /*gender: this.gender,
        name: this.name,
        prename: this.prename,
        birth: this.birth,
        profilePic: this.profilePic, */
        test: false,
        partner: false
      }).then(function() {
        nav.navigateByUrl('/add-partner');
      });
    }

  }

    /*upload(event) {
      console.log(event)
  }

  uploadButton(){
    //console.log(document.getElementById('profilePicture'));

    let element: HTMLElement = document.getElementById('profilePicture') as HTMLElement;
    element.click();
    //console.log(element.click());
  }

  async addFile(){
  const inputAlert = await this.alertCtrl.create({
    header: 'Profilbild hochladen',
    inputs: [
      {
        name: 'info',
        placeholder: 'Lorem Ipsum ...'
      }
    ],
    buttons: [
      {
        text: 'Abbrechen',
        role: 'cancel'
      },
      {
        text: 'Hochladen',
        handler: data => {
          this.uploadInformation(data.info);
        }
      }
    ]
  });

  await inputAlert.present();
  }

  async uploadInformation(text) {
    let upload = this.dataService.uploadToStorage(text);

    upload.then().then(res => {
      this.dataService.storeInfoToDatabase(res.metadata).then(async () => {
        const toast = await this.toastCtrl.create({
          message: 'Profilbild hochgeladen',
          duration: 3000
        });

        await toast.present();
      });
    });
  }

  deleteFile(file){
    this.dataService.deleteFile(file).subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Profilbild entfernt',
        duration: 3000
      });

      await toast.present();
    });

  } */

 /* async takePhoto(){
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 800,
      height: 800,
    }

    /*const result = await this.camera.getPicture(options);
    const image = `data:image/jpeg;base64,${result}`
    const pictures = this._storage.ref('profilePicture');
    pictures.putString(image, 'data_url'); * /

    if(! this.imagePicker.hasReadPermission()){
      this.imagePicker.requestReadPermission();
    }

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
          document.getElementById('uploadImage').setAttribute("src", results[i]);
      }
    }, (err) => { });

  } */

}
