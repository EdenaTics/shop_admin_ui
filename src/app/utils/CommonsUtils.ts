import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonsUtils {

  decodeToken(token: string) {
    // @ts-ignore
    const jwt_decode = require('jwt-decode');
    return jwt_decode(token);
  }

}
