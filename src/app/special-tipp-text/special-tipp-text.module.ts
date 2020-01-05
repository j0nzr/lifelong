import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SpecialTippTextPage } from './special-tipp-text.page';

const routes: Routes = [
  {
    path: '',
    component: SpecialTippTextPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SpecialTippTextPage]
})
export class SpecialTippTextPageModule {}
