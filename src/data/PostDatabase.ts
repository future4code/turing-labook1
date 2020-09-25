import { BaseDataBase } from './BaseDatabase';
import moment from 'moment';
import { Post } from '../model/Post';

export class PostDatabase extends BaseDataBase {
  tablename: string = 'PostsLabook';

  public async createPost(
    id: string,
    image: string,
    description: string,
    type: string,
    id_user: string,
  ): Promise<void> {
    const createdAt = moment().format('YYYY-MM-DD');
    await this.getConnection()
      .raw(`INSERT INTO PostsLabook(id, image, description,type, id_user, createdAt)
            VALUES(
                "${id}",
                "${image}",
                "${description}",
                "${type}",
                "${id_user}",
                "${createdAt}"
            )`);
  }

  public async getAllPosts(): Promise<Post[]> {
    const result = await this.getConnection().raw(`
        SELECT * FROM sagan_andrius_db.PostsLabook 
        ORDER BY createdAt DESC;`);
    return result[0].map((post: any) => {
      return new Post(
        post.id,
        post.image,
        post.description,
        post.type,
        post.id_user,
        moment(post.createdAt).format('DD/MM/YYYY'),
      );
    });
  }

  public async getPostsByType(
    type: string,
    orderBy: string,
    postPerPage: number,
    offset: number,
  ): Promise<Post[]> {
    const result = await this.getConnection().raw(`
                SELECT * FROM sagan_andrius_db.PostsLabook 
                WHERE type = "${type}" ORDER BY createdAt 
                ${orderBy} LIMIT ${postPerPage} OFFSET ${offset};`);
    return result[0].map((post: any) => {
      return new Post(
        post.id,
        post.image,
        post.description,
        post.type,
        post.id_user,
        moment(post.createdAt).format('DD/MM/YYYY'),
      );
    });
  }

  public async setUnlikePost(idUser: string, idPost: string): Promise<any> {
    const result = await this.getConnection().raw(`
            DELETE FROM LikesLabook
            WHERE id_user = "${idUser}"
            AND id_post = "${idPost}";
        `);

    if (result[0].affectedRows === 0) {
      throw new Error('Você não curtiu esse post');
    }
  }
  public async likePost(id_user: string, id_post: string) {
    await this.getConnection().insert({ id_user, id_post }).into('LikesLabook');
  }

  public async destroyConnection(): Promise<void> {
    await this.getConnection().destroy();
  }
}
