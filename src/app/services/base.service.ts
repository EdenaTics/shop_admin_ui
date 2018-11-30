import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserAdmin } from '../bean/UserAdmin';
import { Constant } from '../config/Constant';
import {CommonsUtils} from '../utils/CommonsUtils';


@Injectable()
export class BaseService {

  token: string;
  userConnected: UserAdmin;

  constructor(protected http: HttpClient, protected commonUtils: CommonsUtils) { }

  onInit() {
    this.token = this.getToken();
    this.createUserByToken();
    console.log('token:' + this.token);
  }

  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken() {return localStorage.getItem('token')}

  removeToken() {
    localStorage.removeItem('token');
  }

  logout() {
    this.removeToken();
    this.userConnected = null;
  }

  isTokenEspired() {
    let expired = false;
    try {
      if (this.decodeToken().exp < Date.now() / 1000) {
        this.logout();
        expired = true;
      }
    } catch (e) {
      expired = true;
      console.log(e.toString());
    }
    return expired;

  }

  decodeToken() {
    return this.commonUtils.decodeToken(this.getToken());
  }

  createUserByToken() {
    const tokenObject = this.decodeToken();
    if (this.userConnected == null) {
      this.userConnected = new UserAdmin();
    }
    this.userConnected.username = tokenObject.sub;
    this.userConnected.roles = tokenObject.roles;
    console.log(this.userConnected);
  }

  createHeaderWithToken(): HttpHeaders {
    return new HttpHeaders({'Authorization': Constant.TOKEN_PREFIX + this.getToken()});
  }

}

