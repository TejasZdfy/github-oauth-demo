import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GithubIntegrationComponent } from './components/github-integration/github-integration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { GitProjectsComponent } from './components/git-projects/git-projects.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgHttpLoaderModule } from 'ng-http-loader';

@NgModule({
  declarations: [
    AppComponent,
    GithubIntegrationComponent,
    GitProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    AgGridModule,
    NgHttpLoaderModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
