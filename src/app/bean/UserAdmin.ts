import { Injectable } from '@angular/core';
import { Role } from './Role';

@Injectable()
export class UserAdmin {
   username: string;
   firstName: string
   lastName: string
   id: number
   roles: Array<Role> = [];
}
