import { environment } from '../../environments/environment.development';

export default class Endpoints {
  constructor() {}

  static getUsers = environment.API_Base + '/api/users';
  static getUserById = (id: string) => environment.API_Base + `/api/user/${id}`;
}
