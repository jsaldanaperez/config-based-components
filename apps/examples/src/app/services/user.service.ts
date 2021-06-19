import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { SearchUsersRequest } from '../models/search-users-request';
import { User, UserType } from '../models/user';
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[];

  constructor() { 
    this.users = [
      { 
        id: 1,
        userName: 'José',
        email: 'j.saldanaperez@icloud.com',
        type: UserType.Admin
      },
      { 
        id: 2,
        userName: 'Manfred',
        email: 'johndoe@manfred.com',
        type: UserType.User
      }
    ];
  }

  search(request: SearchUsersRequest): Observable<User[]>{

    const searchTerm = request.searchTerm;
    let filteredUsers = this.users;
    if(searchTerm){
      filteredUsers = filteredUsers.filter(x => x.email.indexOf(searchTerm.toLocaleLowerCase()) > 0 || 
      x.userName.indexOf(searchTerm.toLocaleLowerCase()) > 0)
    }

    return of(filteredUsers).pipe(delay(1500))
  }

}

