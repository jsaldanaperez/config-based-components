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
        userName: 'John',
        email: 'email1@icloud.com',
        type: UserType.Admin,
        inActive: false
      },
      { 
        id: 2,
        userName: 'Jane',
        email: 'email2@gmail.com',
        type: UserType.User,
        inActive: false
      },
      {
        id: 3,
        userName: 'Unknown',
        email: 'email3@hotmail.com',
        type: UserType.User,
        inActive: true
      }
    ];
  }

  search(request: SearchUsersRequest): Observable<User[]>{

    const searchTerm = request.searchTerm;
    let filteredUsers = this.users;
    if(searchTerm?.length){
      filteredUsers = filteredUsers.filter(x => 
        x.email.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1 || 
        x.userName.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1)
    }

    if(request.onlyActive){
      filteredUsers = filteredUsers.filter(x => !x.inActive);
    }

    return of(filteredUsers).pipe(delay(500))
  }

}

