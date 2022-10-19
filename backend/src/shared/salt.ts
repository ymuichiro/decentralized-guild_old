import bcrypt from 'bcrypt';

const config = {
  rounds: 10,
};

/**
 * パスワードをハッシュ化する
 */
export function generateHash(password: string): string {
  const salt = bcrypt.genSaltSync(config.rounds);
  return bcrypt.hashSync(password, salt);
}

/**
 * ハッシュ化された値と入力値を比較する
 */
export function compareHash(input: string, hash: string): boolean {
  return bcrypt.compareSync(input, hash);
}
