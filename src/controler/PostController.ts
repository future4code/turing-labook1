import { Request, Response } from 'express';
import { Authenticator } from '../services/Authenticator';
import { PostBusiness } from '../business/PostBusiness';
import { PostDatabase } from '../data/PostDatabase';
import { PostType } from '../model/Post';

export class PostController {
  public async createPost(req: Request, res: Response) {
    try {
      const postData = {
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
      };

      const token = req.headers.authorization as string;
      const authenticator = new Authenticator().getData(token);

      new PostBusiness().newPost(
        postData.image,
        postData.description,
        postData.type,
        authenticator.id as string,
      );

      res.status(200).send({
        message: 'Post criado com sucesso',
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      new PostDatabase().destroyConnection();
    }
  }

  public async allPosts(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const authenticator = new Authenticator().getData(token);

      const feed = await new PostBusiness().getFeed();

      res.status(200).send({
        feed: feed,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      new PostDatabase().destroyConnection();
    }
  }

  public async feedType(req: Request, res: Response) {
    try {
      const page = Number(req.query.page);
      const orderBy = req.query.orderBy as string;
      const token = req.headers.authorization as string;
      const authenticator = new Authenticator().getData(token);

      let type = PostType.NORMAL;
      try {
        const typeQuery = req.query.type as string;
        if (typeQuery === 'EVENTOS') {
          type = PostType.EVENT;
        }
      } catch (err) {
        res.status(400).send({ err: err.message });
      }

      const feed = await new PostBusiness().getFeedType(type, page, orderBy);

      res.status(200).send({
        feed: feed,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      new PostDatabase().destroyConnection();
    }
  }

  public async likePost(req: Request, res: Response) {
    try {
      const token = req.headers.authorization as string;
      const authenticator = new Authenticator().getData(token);
      console.log(authenticator.id);
      await new PostBusiness().setLike(authenticator.id, req.body.idPost);
      res.status(200).send({
        message: 'sucesso',
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      new PostDatabase().destroyConnection();
    }
  }

  public async unlike(req: Request, res: Response) {
    try {
      const idPost = req.body.idPost;
      const token = req.headers.authorization as string;
      const authenticator = new Authenticator().getData(token);

      await new PostBusiness().unLike(authenticator.id, idPost);

      res.status(200).send({
        message: 'Post descurtido com sucesso',
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    } finally {
      new PostDatabase().destroyConnection();
    }
  }
}
