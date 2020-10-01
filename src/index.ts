import dotenv from 'dotenv';
import { Request, Response } from 'express';
import express from 'express';
import { AddressInfo } from 'net';
import { userRouter } from './routes/UserRouter';
import { postRouter } from './routes/PostRouter';
import { commentRouter } from './routes/CommentRouter';

dotenv.config();
const app = express();

app.use(express.json());

app.use('/users', userRouter);
app.use('/comments', commentRouter);
app.use('/posts', postRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(200).send({ message: 'success' });
});

const server = app.listen(3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Servidor rodando em http://localhost:${address.port}`);
  } else {
    console.error(`Falha ao rodar o servidor.`);
  }
});
