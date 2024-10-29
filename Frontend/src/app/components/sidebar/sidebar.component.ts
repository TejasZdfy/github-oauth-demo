import { Component, EventEmitter, Input, Output } from '@angular/core';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
  subItems?: MenuItem[];
  isExpanded?: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() collapsed = false;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  menuItems: MenuItem[] = [
    {
      icon: 'comment',
      label: 'SOMS',
      route: 'soms',
      subItems: [
        { icon: 'people', label: 'Client', route: 'soms/client' },
        { icon: 'dialpad', label: 'Cabinats', route: 'soms/cabinats' },
        { icon: 'people_outline', label: 'Users', route: 'soms/users' },
        { icon: 'message', label: 'Message', route: 'soms/message' },
        { icon: 'book', label: 'Audit Logs', route: 'soms/audit-logs' },
      ],
      isExpanded: false
    },
    {
      icon: 'account_balance',
      label: 'Financial Dashboard',
      route: 'financial-dashboard',
      isExpanded: false
    },
    {
      icon: 'dashboard',
      label: 'Main Dashboard',
      route: 'main-dashboard',
      isExpanded: false
    },
    {
      icon: 'people',
      label: 'Staff',
      route: 'staff',
      subItems: [
        { icon: 'person', label: 'Integration Mappings', route: 'staff/integration-mappings' },
      ],
      isExpanded: false
    },
    {
      icon: 'people',
      label: 'Platform Users',
      route: 'platform-users',
      isExpanded: false
    },
    {
      icon: 'view_array',
      label: 'Weekly Report',
      route: 'weekly-report',
      isExpanded: false
    },
    {
      icon: 'device_hub',
      label: 'Projects',
      route: 'projects',
      isExpanded: false
    },
    {
      icon: 'hot_tub',
      label: 'Test',
      route: 'test',
      isExpanded: false
    },
    {
      icon: 'view_list',
      label: 'Time Records',
      route: 'time-records',
      isExpanded: false
    },
    {
      icon: 'sync',
      label: 'Integration',
      route: 'integration',
      subItems: [
        { icon: 'get_app', label: 'Setup', route: 'integration/setup' },
        { icon: 'tune', label: 'Rules', route: 'integration/rules' },
        { icon: 'local_movies', label: 'Algorithum Logs', route: 'integration/algorithum-logs' },
        { icon: 'usb', label: 'Diagnostics', route: 'integration/diagnostics' },
      ],
      isExpanded: false
    },
    {
      icon: 'description',
      label: 'Audit Logs',
      route: 'audit-logs',
      isExpanded: false
    },
    {
      icon: 'timeline',
      label: 'Time Machine',
      route: 'time-machine',
      isExpanded: false
    },
    {
      icon: 'settings',
      label: 'Admin Settings',
      route: 'admin-settings',
      isExpanded: false
    }
  ];

  getToggleIcon(item: MenuItem) {
    return item.isExpanded ? 'expand_less' : 'expand_more';
  }

  toggleSubMenu(selectedItem: MenuItem): void {
    if (selectedItem.isExpanded) {
      selectedItem.isExpanded = false;
    } else {
      this.menuItems.forEach(item => {
        item.isExpanded = false;
      });
      selectedItem.isExpanded = true;
    }
  }

}