import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  getUserIdFromLocalStorage() {
    const userId = localStorage.getItem('userId');
    return userId ? JSON.parse(userId) : null;
  }

  saveUserIdToLocalStorage(id: any) {
    localStorage.setItem('userId', JSON.stringify(id));
  }

  removeUserIdFromLocalStorage() {
    localStorage.removeItem('userId');
  }
}
