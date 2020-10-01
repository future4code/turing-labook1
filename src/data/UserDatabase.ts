import { BaseDataBase } from './BaseDatabase';

export class UserDatabase extends BaseDataBase {
  tableName: string = 'UsersLabook';

  public async signup(
    name: string,
    email: string,
    id: string,
    password: string,
  ) {
    if ((await this.getUserEmail(email)) !== undefined) {
      throw new Error('Oooops! Email já cadastrado.');
    } else {
      return await super
        .getConnection()
        .insert({
          id,
          name,
          email,
          password,
        })
        .into(this.tableName);
    }
  }

  public async getUserEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(this.tableName)
      .where({ email });

    return result[0];
  }

  public async registerUser(
    id: string,
    name: string,
    email: string,
    password: string,
  ): Promise<void> {
    await this.getConnection()
      .insert({
        id,
        name,
        email,
        password,
      })
      .into(UserDatabase.tableName);
  }
  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.tableName)
      .where({ email });
    return result[0];
  }

  public async addNewFriendship(
    id_inviter: string,
    id_invited: string,
  ): Promise<any> {
    await this.getConnection()
      .insert({ id_inviter, id_invited })
      .into('RelationsLabook');
  }

  public async deleteFriendship(id_invited: string): Promise<any> {
    await this.getConnection()
      .delete()
      .from('RelationsLabook')
      .where({ id_invited });
  }

  public async destroyConnection(): Promise<void> {
    await this.getConnection().destroy();
  }
}
