import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {Constant} from '../config/Constant';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService{

  private HOST: string = Constant.HOST;

  getListAdmin() {
    return this.listAdmin();
  }

  private listAdmin() {
    return this.http.get(this.HOST + '/rest/admin/users', {headers: this.createHeaderWithToken()});
  }
}
