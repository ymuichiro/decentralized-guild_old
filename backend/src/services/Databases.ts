import mysql from 'mysql2';
import { components } from '../@types/swagger';

type Schema = components['schemas'];

class Database {
  protected constructor() {}
  static async query<T>(sql: string, ...values: string[]): Promise<T> {
    const {
      DATABASE_HOST: host,
      DATABASE_USER_NAME: user,
      DATABASE_NAME: database,
      DATABASE_USER_PASS: password,
    } = process.env;
    const connection = mysql.createConnection({ host, user, database, password });
    try {
      const result = new Promise<T>((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
          if (err) reject(err);
          resolve(results as any);
        });
      });
      return result;
    } catch (e) {
      throw new Error((e as Error).stack);
    } finally {
      connection.end();
    }
  }
}

export class User extends Database {
  private constructor() {
    super();
  }
  static async find(public_key: string) {
    const query = 'SELECT * FROM user WHERE public_key = ?;';
    const res = await this.query<Schema['UserTable'][]>(query, public_key);
    return res.length === 0 ? null : res[0];
  }
  static async list() {
    const query = 'SELECT * FROM user;';
    const res = await this.query<Schema['UserTable'][]>(query);
    return res;
  }
  static async count() {
    const query = 'SELECT COUNT(*) AS counter FROM user;';
    const res = await this.query<{ counter: number }[]>(query);
    return res[0].counter;
  }
  static async insert(public_key: string, name: string, icon: string) {
    const query = 'INSERT INTO user (public_key, name, icon, created) VALUES (?, ?, ?, now())';
    return await this.query(query, public_key, name, icon);
  }
}
