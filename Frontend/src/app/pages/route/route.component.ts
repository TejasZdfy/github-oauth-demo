import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {
  routeName!:string;
  constructor(private router: Router, private activatedRoute: ActivatedRoute,  private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.setRouteName();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.setRouteName();
      });
  }

  private setRouteName(): void {
    const urlSegments = this.router.url.split('/');
    this.routeName = urlSegments[urlSegments.length - 1];
    console.log("routeName:", this.routeName);
    this.cdr.detectChanges(); 
  }

}