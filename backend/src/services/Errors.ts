import HttpStatusCodes from 'http-status-codes';

/**
 * 基本のエラークラス
 */
export abstract class CustomError extends Error {
  public readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  /**
   * 継承先クラスからの入力を受け取る
   */
  constructor(msg: string, httpStatus: number) {
    super(msg);
    this.HttpStatus = httpStatus;
  }
}

/**
 * クライアントサイドからの入力値が正しくない場合のエラー
 */
export class ParamMissingError extends CustomError {
  public static readonly Msg = 'One or more of the required parameters was missing.';
  public static readonly HttpStatus = HttpStatusCodes.BAD_REQUEST;

  constructor() {
    super(ParamMissingError.Msg, ParamMissingError.HttpStatus);
  }
}

/**
 * 未認証時エラー
 */
export class UnauthorizedError extends CustomError {
  public static readonly Msg = 'Login failed';
  public static readonly HttpStatus = HttpStatusCodes.UNAUTHORIZED;

  constructor() {
    super(UnauthorizedError.Msg, UnauthorizedError.HttpStatus);
  }
}
