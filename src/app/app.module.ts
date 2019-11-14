import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AndroidFullScreen } from '@ionic-native/android-full-screen/ngx';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';
//import { ImagePicker } from '@ionic-native/image-picker';
//import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    NgxAuthFirebaseUIModule.forRoot(
      firebaseConfig,
      () => 'lifelong',
      {
        enableFirestoreSync: true, // enable/disable autosync users with firestore
                  toastMessageOnAuthSuccess: false, // whether to open/show a snackbar message on auth success - default : true
                  toastMessageOnAuthError: true, // whether to open/show a snackbar message on auth error - default : true
                  authGuardFallbackURL: '/login-register-ov', // url for unauthenticated users - to use in combination with canActivate feature on a route
                  authGuardLoggedInURL: '/home' // url for authenticated users - to use in combination with canActivate feature on a route
      }),
    NgxQRCodeModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    AngularFireDatabase,
    BarcodeScanner,
    //ImagePicker,
    //Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
