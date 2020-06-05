type AuthenticationParams = {
  email: string;
  password: string;
}

import { AccountModel } from '../models/account.models'

export interface Authentication {
  auth(params: AuthenticationParams): Promise<AccountModel>
};