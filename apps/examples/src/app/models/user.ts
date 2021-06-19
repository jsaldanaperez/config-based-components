export class User {
    id: number;
    userName: string;
    email: string;
    type: UserType;
}

export enum UserType{
    User = 1, 
    Admin = 2
}