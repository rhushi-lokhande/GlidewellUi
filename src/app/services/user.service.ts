import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interface/user.interface'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  getUserList() {
    return this._httpClient.get('/api/User');
  }
  addNewUser(user: IUser) {
    return this._httpClient.post('/api/User', user);
  }
  updateUser(user: IUser) {
    return this._httpClient.put(`/api/User/${user.id}`, user);
  }
  deleteUser(user: IUser) {
    return this._httpClient.delete(`/api/User/${user.id}`);
  }
}
