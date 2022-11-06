/**
 * システムが徴収する手数料額
 * ユーザーがフロントエンドを改竄し、手数料をごまかした際には、システム側での署名を行わない。
 */
export interface SystemFee {
  createAccount: number;
  createQuest: number;
  acceptQuest: number;
  deposit: number;
}
