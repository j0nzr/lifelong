import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HomePageModule } from '../home/home.module';
import { SettingsPageModule } from '../settings/settings.module';
import { ResultsPageModule } from '../results/results.module';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children:[
        { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
        { path: 'settings', loadChildren: '../settings/settings.module#SettingsPageModule' },
        { path: 'results', loadChildren: '../results/results.module#ResultsPageModule'}
    ] 
    /*path: 'tabs',
    component: TabsPage,
    children:[
    { path: 'home', component: HomePageModule, outlet: 'home'},
    { path: 'settings', component: SettingsPageModule, outlet: 'settings'},
    { path: 'results', component: ResultsPageModule, outlet: 'results'},
    ] */
  },
  {
    path:'',
    redirectTo:'tabs/tabs/home',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: [TabsPage]
})
export class TabsPageModule {}
