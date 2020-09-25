import { PostDatabase } from '../data/PostDatabase';
import { IdGenerator } from '../services/IdGenerator';
import { PostOrderBy } from '../model/Post';

export class PostBusiness {
  public async newPost(
    image: string,
    description: string,
    type: string,
    id_user: string,
  ) {
    const idCreator = new IdGenerator();
    const id = idCreator.generateId();

    return await new PostDatabase().createPost(
      id,
      image,
      description,
      type,
      id_user,
    );
  }

  public async getFeed() {
    return await new PostDatabase().getAllPosts();
  }

  public async getFeedType(type: string, page: number, orderBy: string) {
    const postPerPage = 3;
    let offset = postPerPage * (page - 1);
    return await new PostDatabase().getPostsByType(
      type,
      PostBusiness.mapStringToOrderBy(orderBy),
      postPerPage,
      offset,
    );
  }

  public async unLike(idUser: string, idPost: string) {
    return await new PostDatabase().setUnlikePost(idUser, idPost);
  }
  public async setLike(id_user: string, id_post: string) {
    return await new PostDatabase().likePost(id_user, id_post);
  }

  static mapStringToOrderBy(orderBy: string): PostOrderBy {
    switch (orderBy.toUpperCase()) {
      case 'RECENTES':
        return PostOrderBy.RECENT;
      case 'ANTIGOS':
        return PostOrderBy.OLD;
      default:
        throw new Error('Tipo de ordem inválida');
    }
  }
}
