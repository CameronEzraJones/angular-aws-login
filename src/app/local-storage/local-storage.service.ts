import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  get(key: string) {
    return window.localStorage.getItem(key);
  }

  set(key: string, data: string) {
    window.localStorage.setItem(key, data);
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }

  length() {
    return window.localStorage.length;
  }

  key(index: number) {
    return window.localStorage.key(index);
  }

  clear() {
    window.localStorage.clear();
  }
}
