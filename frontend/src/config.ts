import { Network, NodeInfo } from './models/Network';
import { SystemFee } from './models/Tax';

/**
 * 検証用データ。本データはフロントエンド側の GlobalState or SSS により管理されているもの
 * 本来はサーバー側から引っ張ってくるが、ハッカソン期間中はノード情報等はハードコードでいいと思う
 */
export const TEST_DATA = {
  WORKER: {
    KEY: {
      PUBLIC:
        '87B3802189D9C74AECF8915B015ACD4A69CE777EE4DDE8B51ADF6237AFC65478',
      PRIVATE:
        'B9B39486BEFD899BC678D5A7E99186E190076605702D5904721C684F266A257D',
    },
  },
  REQUESTER: {
    KEY: {
      PUBLIC:
        '87B3802189D9C74AECF8915B015ACD4A69CE777EE4DDE8B51ADF6237AFC65478',
      PRIVATE:
        'DEA5FDB45AEB9485F1D612B738DA3ECD7817E547D44B6D8123ACE15511AED7D1',
    },
  },
  ESTABLISHER: {
    KEY: {
      PUBLIC:
        'CD5BBD868762461096AAEFF3ECC4254099F9B60F538CF3EB47359F27A9185060',
      PRIVATE: 'DEA5FDB45AEB9485F1D612B738DA3ECD7817E547D44B6D8123ACE15511AED7D1',
    },
  },
  GUILD_OWNER: {
    KEY: {
      PUBLIC:
        'B12D953B142CAF46652DCA769A1816B33FD66C8BB727DC8158388ED013285A8F',
    },
    MOSAIC_ID: {
      LOW_MOSAIC_ID: '681E2FB3218A1419',
      HIGH_MOSAIC_ID: '109C1C409343C449',
    }
  },
  SYSTEM: {
    KEY: {
      PUBLIC:
        '6F50170029B2647B883EB43A7451104EC4086373814DC7A4D115825B3B705126',
      PRIVATE: '29E658CB66CCD912205F3B21E632B1AB2B58FC12FAADA54A7B51682D0FEB7A6D',
    },
    WRP_MOSAIC_ID: '15C6DE40D310C2DA',
    GUILD_POINT_MOSAIC_ID: '5723ADD9F8610384',
  },
  NETWORK: {
    generationHash:
      'CD5BBD868762461096AAEFF3ECC4254099F9B60F538CF3EB47359F27A9185060',
    type: 152,
    epochAdjustment: 1637848847,
    currencyMosaicId: '3A8416DB2D53B6C8',
    networkCurrencyDivisibility: 6,
  } as Network,
  NODE: {
    url: 'https://mikun-testnet2.tk:3001',
  } as NodeInfo,
  FEE: {
    createAccount: 0,
    createQuest: 0,
    acceptQuest: 0,
    deposit: 0,
  } as SystemFee,
  AUTH: {
    TOKEN:
      '4C3F3CD26FA13027C8AA4CAB11277ACCB0C4A34F680C16BDD8AD4CFDB84765E0D871A8F3D736472333F255332137BB2DA7E53019B0A45C2EF7B1325992A641A2FA5B95244161F492F72B103F89C109389326A82F4E19698CC2B07D219CADE47C92B16EC86C9257782210E093B2D54F364207BB438FFAB96867D4210304BEAE79B66A732B263EDADF5762D4E320747AEC154CE5B16AA0815DB2FE169FE08A7D47759415AE84AEA45FAFF00FB5C58BE3AD4E38BD1ECB',
  },
};

// export const establisherPublicKey =
//   "CD5BBD868762461096AAEFF3ECC4254099F9B60F538CF3EB47359F27A9185060";
// export const ownerPublicKey =
//   "B12D953B142CAF46652DCA769A1816B33FD66C8BB727DC8158388ED013285A8F";
// export const epochAdjustment = 1637848847;
// export const networkCurrencyMosaicId = new MosaicId("3A8416DB2D53B6C8");
// export const verifierPublicKey =
//   "B12D953B142CAF46652DCA769A1816B33FD66C8BB727DC8158388ED013285A8F";

// export const ownerPublic = PublicAccount.createFromPublicKey(
//   ownerPublicKey,
//   networkType
// );
// export const guildUserMetadataKey = "GuildUser";
// export const networkCurrencyDivisibility = 6;
// export const createAccountTaxFee = 0;
// export const createQuestTaxFee = 0;
// export const acceptQuestTaxFee = 0;
// export const questMetadataKey = "QuestDetails";
// export const createAccountTaxMessage = "Create Account Fee";
// export const createQuestTaxMessage = "Create Quest Fee";

// export const systemPublicKey =
//   "6F50170029B2647B883EB43A7451104EC4086373814DC7A4D115825B3B705126";
// export const systemPublic = PublicAccount.createFromPublicKey(
//   systemPublicKey,
//   networkType
// );
// export const mosaicSupplyAmount = 100000000;
// export const guildOwnerMosaicIdsMetadataKey = "guildOwnerMosaicIds";
// export const guildMosaicId = "4EB02B2A69A6D891";
// export const wrpId = "15C6DE40D310C2DA";
// export const guildPointId = "5723ADD9F8610384";

// export const depositFeeAmount = 10000000;
// // test
// export const establisherPrivateKey =
//   "DEA5FDB45AEB9485F1D612B738DA3ECD7817E547D44B6D8123ACE15511AED7D1";
// export const kagenMosaicId = "681E2FB3218A1419";
// export const jougenMosaicId = "109C1C409343C449";
