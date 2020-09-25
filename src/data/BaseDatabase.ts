import dotenv from 'dotenv';
dotenv.config();
import knex from 'knex';
import Knex from 'knex';

export abstract class BaseDataBase {
  static tableName: string;

  getConnection(): Knex {
    return knex({
      client: 'mysql',
      connection: {
        host: process.env.DB_HOST,
        port: Number(process.env.PORT || '3306'),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE_NAME,
      },
    });
  }

  protected convertBooleanToTinyint(value: boolean): number {
    return value ? 1 : 0;
  }

  protected convertTinyintToBoolean(value: number): boolean {
    return value === 1;
  }
}
