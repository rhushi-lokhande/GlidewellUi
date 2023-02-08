import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interface/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  isProcessing: boolean = false;
  constructor(private _userService: UserService, private _cd: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList() {
    this.isLoading = true;
    this._userService.getUserList().subscribe(res => {
      this.userList = res;
      this.isLoading = false;
      this._cd.detectChanges();
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
    this.isProcessing = false;
  }
  deleteUser(user: IUser) {
    this.isProcessing = true;
    this._userService.deleteUser(user).subscribe(res => {
      this.getUserList();
      this.isProcessing = false;
    })
  }
  enableEdit(user: IUser) {
    this.toggleAddUesr();
    Object.assign(this.user, user);

  }
  saveNewUser() {
    this.enableValidation = true;
    if (this.user.id && this.isValidUser()) {
      this.isProcessing = true;
      this._userService.updateUser(this.user).subscribe(res => {
        this.getUserList();
        this.toggleAddUesr();
      })
    } else if (this.isValidUser()) {
      this.isProcessing = true;
      this._userService.addNewUser(this.user).subscribe(res => {
        // this.getUserList();
        this.userList.push(res);
        this.toggleAddUesr();
        this._cd.detectChanges();
      })
    }
  }

  isValidUser() {
    var regName = /^[a-zA-Z]+[a-zA-Z]+$/;

    if (regName.test(this.user.firstName.trim()) && regName.test(this.user.lastName.trim())) {
      return true;
    }
    return false;
  }
}