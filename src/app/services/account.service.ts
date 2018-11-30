import { Injectable } from '@angular/core';
import { Constant } from '../config/Constant';
import { Token } from '../bean/Token';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService{

  private HOST:string = Constant.HOST;


  authent(loginForm){
    // return this.http.post(this.HOST + "/login",loginForm,{'observe':'response'});
    return this.http.post(this.HOST + '/login', loginForm);
  }

  manageResult(loginForm: Token) {
    this.saveToken(loginForm.token.substr(Constant.TOKEN_PREFIX.length));
    this.createUserByToken();
  }
}
