import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AgGridModule } from 'ag-grid-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteComponent } from './route/route.component';


@NgModule({
  declarations: [
    RouteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AgGridModule,
    AngularMaterialModule
  ]
})
export class PagesModule { }
