export interface LoggedInUser {
  _id: string;
  token: string;
  name: string;
  email: string;
  phone: string;
  favourites: [string, boolean];
}
