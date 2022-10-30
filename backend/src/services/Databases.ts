import mysql from 'mysql2';
import { components } from '../@types/swagger';

type Schema = components['schemas'];

class Database {
  protected constructor() {}
  static async query<T>(sql: string, ...values: (string | number | boolean | undefined | null)[]): Promise<T> {
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
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM user WHERE public_key = ?;';
    const res = await this.query<Schema['UserTable'][]>(query, public_key);
    return res.length === 0 ? null : res[0];
  }
  static async list() {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM user;';
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

export class Guild extends Database {
  private constructor() {
    super();
  }
  static async find(guild_id: number) {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM guild WHERE guild_id = ?;';
    const res = await this.query<Schema['GuildTable'][]>(query, guild_id);
    return res.length === 0 ? null : res[0];
  }
  static async list() {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM guild;';
    const res = await this.query<Schema['GuildTable'][]>(query);
    return res;
  }
  static async count() {
    const query = 'SELECT COUNT(*) AS counter FROM guild;';
    const res = await this.query<{ counter: number }[]>(query);
    return res[0].counter;
  }
  static async insert(owner_public_key: string, name: string, icon: string) {
    const query = 'INSERT INTO guild (owner_public_key, name, icon, created) VALUES (?, ?, ?, now())';
    return await this.query(query, owner_public_key, name, icon);
  }
}

export class Quest extends Database {
  private constructor() {
    super();
  }
  static async find(quest_id: number) {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM quest WHERE quest_id = ?;';
    const res = await this.query<Schema['QuestTable'][]>(query, quest_id);
    return res.length === 0 ? null : res[0];
  }
  static async list() {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM quest;';
    const res = await this.query<Schema['QuestTable'][]>(query);
    return res;
  }
  static async count() {
    const query = 'SELECT COUNT(*) AS counter FROM quest;';
    const res = await this.query<{ counter: number }[]>(query);
    return res[0].counter;
  }
  // prettier-ignore
  static async insert(field: Pick<components['schemas']['Quest'], 'nominate_guild_id' | 'title' | 'description' | 'reward' | 'requester_public_key'>) {
    const query = 'INSERT INTO quest (nominate_guild_id, title, description, reward, requester_public_key, status, created) VALUES (?, ?, ?, ?, ?, ?, now())';
    return await this.query(
      query,
      field.nominate_guild_id,
      field.title,
      field.description,
      field.reward,
      field.requester_public_key,
      'WANTED',
    );
  }
}

export class GuildQuest extends Database {
  private constructor() {
    super();
  }
  static async find(quest_id: number) {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM quest WHERE quest_id = ?;';
    const res = await this.query<Schema['QuestTable'][]>(query, quest_id);
    return res.length === 0 ? null : res[0];
  }
  static async list(nominate_guild_id: number) {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM quest WHERE nominate_guild_id = ?;';
    const res = await this.query<Schema['QuestTable'][]>(query, nominate_guild_id);
    return res;
  }
  static async count(nominate_guild_id: number) {
    const query = 'SELECT COUNT(*) AS counter FROM quest WHERE nominate_guild_id = ?;';
    const res = await this.query<{ counter: number }[]>(query, nominate_guild_id);
    return res[0].counter;
  }
  // prettier-ignore
  static async insert(field: Pick<components['schemas']['Quest'], 'nominate_guild_id' | 'title' | 'description' | 'reward' | 'requester_public_key'>) {
    const query = 'INSERT INTO quest (nominate_guild_id, title, description, reward, requester_public_key, status, created) VALUES (?, ?, ?, ?, ?, ?, now())';
    return await this.query(
      query,
      field.nominate_guild_id,
      field.title,
      field.description,
      field.reward,
      field.requester_public_key,
      'WANTED',
    );
  }
}

export class Notice extends Database {
  private constructor() {
    super();
  }
  static async list(public_key: string) {
    const query = 'SELECT *, UNIX_TIMESTAMP(created) AS created FROM notice WHERE public_key = ?;';
    const res = await this.query<Schema['Notice'][]>(query, public_key);
    return res;
  }
  static async count(public_key: string) {
    const query = 'SELECT COUNT(*) AS counter FROM notice WHERE public_key = ?;';
    const res = await this.query<{ counter: number }[]>(query, public_key);
    return res[0].counter;
  }
  static async insert(field: Omit<components['schemas']['Notice'], 'created'>) {
    const query = 'INSERT INTO notice (public_key, title, body, created) VALUES (?, ?, ?, now())';
    return await this.query(query, field.public_key, field.title, field.body);
  }
}
