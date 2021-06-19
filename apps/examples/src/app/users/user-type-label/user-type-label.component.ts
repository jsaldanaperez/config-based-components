import { Component, Input } from '@angular/core';
import { UserType } from '../../models/user';

@Component({
  selector: 'app-user-type-label',
  templateUrl: './user-type-label.component.html',
  styleUrls: ['./user-type-label.component.scss']
})
export class UserTypeLabelComponent {
  @Input() value: UserType;
  userTypes = UserType;
}