import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isLoading = true;
  userList: any;
  constructor(private _userService: UserService) { }
  ngOnInit(): void {
    this._userService.getUserList().subscribe(res => {
      console.log(res);
      this.userList = res;
      this.isLoading = false;
    })
  }

}