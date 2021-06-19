import { Component, OnInit } from '@angular/core';
import { SearchUsersRequest } from '../../models/search-users-request';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { TableConfig } from '../../shared/table/table-config';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  config: TableConfig<SearchUsersRequest, User>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.config = new TableConfig<SearchUsersRequest, User>({
      search: (criteria) => this.userService.search(criteria)
    })
  }

}
