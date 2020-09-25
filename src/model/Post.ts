export class Post  {
  constructor(
    private id: string,
    private image: string,
    private description: string,
    private type: string,
    private idUser: string,
    private createdAt: string,
  ) {}
}

export enum PostType {
  NORMAL = 'normal',
  EVENT = 'event',
}

export enum PostOrderBy {
  RECENT = 'DESC',
  OLD = 'ASC',
}
