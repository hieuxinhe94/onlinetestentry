export class User {
  id: number;

  userName: string;
  password: string;
  role: Role;
  fullName: string;
  phone: string;
  adress: string;
  email: string;
  status: number;
  createdDate: Date;
  lastActivateDate: Date;

  constructor(data: any) {
    data = data || {};
    this.id = data.id;
    this.userName = data.userName;
    this.password = data.password;
    this.role = data.role;

    this.phone = data.phone;
    this.adress = data.adress;

    this.status = data.status;

    this.createdDate = data.createdDate;
    this.lastActivateDate = data.lastActivateDate;
  }

}
export enum Role {
  ADMIN, EMP, CANDIDATE
}


