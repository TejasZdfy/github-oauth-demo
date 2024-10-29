import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatListModule
  ],

})
export class AngularMaterialModule { }
