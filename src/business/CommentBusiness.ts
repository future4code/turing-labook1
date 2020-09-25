import { CommentDatabase } from "../data/CommentDatabase";
import { IdGenerator } from "../services/IdGenerator";

export class CommentBusiness {

    public async commentPost(id_user: string, id_post: string, comment: string) {
        const idCreator = new IdGenerator()
        const id = idCreator.generateId()

        return await new CommentDatabase().commentPost(id, id_user, id_post, comment);
    }

}
