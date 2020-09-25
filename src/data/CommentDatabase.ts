import { BaseDataBase } from "./BaseDatabase";

export class CommentDatabase extends BaseDataBase {
    tablename: string = "CommentsLabook"

    public async commentPost(
        id: string,
        id_user: string,
        id_post: string,
        comment: string
    ): Promise<void> {
        await this.getConnection().raw(`
            INSERT INTO ${this.tablename}(id, id_user, id_post, comment)
            VALUES(
            "${id}",
            "${id_user}",
            "${id_post}",
            "${comment}"
            )`)
    }

    public async destroyConnection(): Promise<void> {
        await this.getConnection().destroy()
    }
}