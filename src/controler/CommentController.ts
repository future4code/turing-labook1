import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { CommentBusiness } from '../business/CommentBusiness';
import { CommentDatabase } from '../data/CommentDatabase';

export class CommentController {
  public async commentPost(req: Request, res: Response) {
    try {
      const commentData = {
        id_post: req.body.id_post,
        comment: req.body.comment,
      };

      const token = req.headers.authorization as string;
      const authenticator = new Authenticator().getData(token);

      new CommentBusiness().commentPost(
        authenticator.id as string,
        commentData.id_post,
        commentData.comment,
      );

      res.status(200).send({
        message: 'comentado',
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      new CommentDatabase().destroyConnection();
    }
  }
}
