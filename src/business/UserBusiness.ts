import { UserDatabase } from '../data/UserDatabase';

export class UserBusiness {
  public async signup(
    name: string,
    email: string,
    id: string,
    password: string,
  ) {
    return new UserDatabase().signup(name, email, id, password);
  }

  public async login(email: string) {
    return new UserDatabase().getUserEmail(email);
  }

  public async addFriend(id_inviter: string, id_invited: string) {
    return new UserDatabase().addNewFriendship(id_inviter, id_invited);
  }

  public async deleteFriend(id_invited: string) {
    return new UserDatabase().deleteFriendship(id_invited);
  }
}
