import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  userdata: any;
  isConnected: any;
  constructor() { }
}
