import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { GithubIntegrationComponent } from './pages/github-integration/github-integration.component';
import { GitProjectsComponent } from './pages/git-projects/git-projects.component';

@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SidebarComponent,
    GithubIntegrationComponent,
    GitProjectsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule,
    NgHttpLoaderModule.forRoot(),
    AngularMaterialModule

  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
