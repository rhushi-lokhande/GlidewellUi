import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  isLoading = true;
  userList: any;
  enableAddNewUser = false;
  user: IUser = {
    firstName: '',
    lastName: '',
    isActive: true
  }
  enableValidation: boolean = false;
  constructor(private _userService: UserService) { }
  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList() {
    this.isLoading = true;
    this._userService.getUserList().subscribe(res => {
      console.log(res);
      this.userList = res;
      this.isLoading = false;
    })
  }
  toggleAddUesr() {
    this.user = {
      firstName: '',
      lastName: '',
      isActive: true
    }
    this.enableAddNewUser = !this.enableAddNewUser;
    this.enableValidation = false;
  }
  deleteUser(user: IUser) {
    this._userService.deleteUser(user).subscribe(res => {
      this.getUserList();
    })
  }
  enableEdit(user: IUser) {
    this.toggleAddUesr();
    Object.assign(this.user, user);

  }
  saveNewUser() {
    this.enableValidation = true;
    if (this.user.id && this.isValidUser()) {
      this._userService.updateUser(this.user).subscribe(res => {
        this.getUserList();
        this.toggleAddUesr();
      })
    } else if (this.isValidUser()) {
      this._userService.addNewUser(this.user).subscribe(res => {
        // this.getUserList();
        this.userList.push(res);
        this.toggleAddUesr();
      })
    }
  }

  isValidUser() {
    if (this.user.firstName && this.user.lastName) {
      return true;
    }
    return false;
  }
}