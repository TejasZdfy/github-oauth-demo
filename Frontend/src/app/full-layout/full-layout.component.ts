import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, single } from 'rxjs';
export interface SidebarItem {
  main?: string; // Main item must be a string
  sub?: string; // Sub-item can be a string or undefined
}
@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  styleUrls: ['./full-layout.component.css']
})
export class FullLayoutComponent  {
  collapsed = false;
  
  toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

}
