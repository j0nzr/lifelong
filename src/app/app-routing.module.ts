import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

const routes: Routes = [
  { path: '', redirectTo: 'login-register-ov', pathMatch: 'full' },
  //{ path: 'home', loadChildren: './home/home.module#HomePageModule'},
  { path: 'login-email', loadChildren: './login-email/login-email.module#LoginEmailPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'login-register-ov', loadChildren: './login-register-ov/login-register-ov.module#LoginRegisterOvPageModule' },
  { path: 'password-reset', loadChildren: './password-reset/password-reset.module#PasswordResetPageModule' },
  { path: 'add-partner', loadChildren: './add-partner/add-partner.module#AddPartnerPageModule' },
  //{ path: 'settings', loadChildren: './settings/settings.module#SettingsPageModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
];

function redirect(_afAuth: AngularFireAuth): string{
  var result: string;
  var _afAuth: AngularFireAuth;

  if (_afAuth.auth.currentUser){
    result = 'home';
  } else{
    result = 'login-register-ov'
  }
  return result;
}

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
