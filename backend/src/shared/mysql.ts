import mysql from 'mysql2';

export default async function query<T>(sql: string, ...values: string[]): Promise<T | T[]> {
  const connection = mysql.createConnection({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    database: process.env.SQL_DATABASE,
  });

  try {
    const result = new Promise<T>((resolve, reject) => {
      connection.query(sql, values, (err, results) => {
        if (err) reject(err);

        resolve(results as any | any[]);
      });
    });

    return result;
  } catch (e) {
    throw new Error((e as Error).stack);
  } finally {
    connection.end();
  }
}
