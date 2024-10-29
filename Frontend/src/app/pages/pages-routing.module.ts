import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteComponent } from './route/route.component';

const routes: Routes = [
  {
    path: 'soms/client',
    component: RouteComponent,
  },
  {
    path: 'soms/cabinats',
    component: RouteComponent,
  },
  {
    path: 'soms/users',
    component: RouteComponent,
  },
  {
    path: 'soms/message',
    component: RouteComponent,
  },
  {
    path: 'soms/audit-logs',
    component: RouteComponent,
  },
  {
    path: 'financial-dashboard',
    component: RouteComponent,
  },
  {
    path: 'main-dashboard',
    component: RouteComponent,
  },
  {
    path: 'staff/integration-mappings',
    component: RouteComponent,
  },
  {
    path: 'platform-users',
    component: RouteComponent,
  },
  {
    path: 'weekly-report',
    component: RouteComponent,
  },
  {
    path: 'projects',
    component: RouteComponent,
  },
  {
    path: 'test',
    component: RouteComponent,
  },
  {
    path: 'time-records',
    component: RouteComponent,
  },
  {
    path: 'integration/setup',
    component: RouteComponent,
  },
  {
    path: 'integration/rules',
    component: RouteComponent,
  },
  {
    path: 'integration/algorithum-logs',
    component: RouteComponent,
  },
  {
    path: 'integration/diagnostics',
    component: RouteComponent,
  },
  {
    path: 'audit-logs',
    component: RouteComponent,
  },
  {
    path: 'time-machine',
    component: RouteComponent,
  },
  {
    path: 'admin-settings',
    component: RouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
