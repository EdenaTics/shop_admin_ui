import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {UserAdmin} from '../../bean/UserAdmin';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {

  listUserAdmin: Array<UserAdmin> = [];

  headElements = ['ID', 'FirstName', 'LastName', 'Username', 'status'];

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.getListAdmin();
  }

  private getListAdmin() {
    this.usersService.getListAdmin().subscribe(result => {
      console.log(result);
      this.listUserAdmin = result as Array<UserAdmin>;
    }, error1 => {

    });
  }


}
