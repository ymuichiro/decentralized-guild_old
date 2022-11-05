import { AuthService } from '../service/AuthService'
import QuestService from '../service/QuestService'
import GuildService from '../service/GuildService'
import { TEST_DATA } from '../config';

import { announceTransaction } from '../contracts/announce'
import {MosaicNonce, Account, NetworkType, MosaicId, MosaicDefinitionTransaction, Deadline, MosaicFlags, UInt64, MosaicSupplyChangeTransaction, MosaicSupplyChangeAction, AggregateTransaction} from 'symbol-sdk';

const Test = (): JSX.Element => {
    const handleLogin = async () => {
        const nonce1 = MosaicNonce.createRandom();
        const network = NetworkType.MAIN_NET;
        const system = Account.createFromPrivateKey('BF06E10071CBD0BE25EFF8670198A1AA80CE149D3FFA02AF0CCCAF40B645E9EC', network)
        const mosaicId1 = MosaicId.createFromNonce(nonce1, system.address);
        console.log(mosaicId1)
        const mosaicDefinitionTransaction1 = MosaicDefinitionTransaction.create(
            Deadline.createEmtpy(),
            nonce1,
            mosaicId1,
            MosaicFlags.create(false, false, true, true),
            0,
            UInt64.fromUint(0),
            network
        );
        const mosaicSupplyChangeTransaction1 = MosaicSupplyChangeTransaction.create(
            Deadline.createEmtpy(),
            mosaicDefinitionTransaction1.mosaicId,
            MosaicSupplyChangeAction.Increase,
            UInt64.fromUint(100000000 * Math.pow(10, 0)),
            network
        );

        const nonce2 = MosaicNonce.createRandom();
        const mosaicId2 = MosaicId.createFromNonce(nonce2, system.address);
        const mosaicDefinitionTransaction2 = MosaicDefinitionTransaction.create(
            Deadline.createEmtpy(),
            nonce2,
            mosaicId2,
            MosaicFlags.create(false, false, true, true),
            0,
            UInt64.fromUint(0),
            network
        );
        const mosaicSupplyChangeTransaction2 = MosaicSupplyChangeTransaction.create(
            Deadline.createEmtpy(),
            mosaicDefinitionTransaction2.mosaicId,
            MosaicSupplyChangeAction.Increase,
            UInt64.fromUint(100000000 * Math.pow(10, 0)),
            network
        );

        const aggregateTransaction = AggregateTransaction.createComplete(
            Deadline.create(1615853185),
            [
            mosaicDefinitionTransaction1.toAggregate(system.publicAccount),
            mosaicSupplyChangeTransaction1.toAggregate(system.publicAccount),
            mosaicSupplyChangeTransaction2.toAggregate(system.publicAccount),
            mosaicSupplyChangeTransaction2.toAggregate(system.publicAccount),
            ],
            network,
            []
        ).setMaxFeeForAggregate(100, 0);

        const signed = system.sign(aggregateTransaction, '57F7DA205008026C776CB6AED843393F04CD458E0AA2D9F1D5F31A402072B2D6');
        announceTransaction(signed, TEST_DATA.NODE)
        //await GuildService.establishGuild(100000000, TEST_DATA.NETWORK, TEST_DATA.NODE);
        //await QuestService.receivedQuest('contract_id', '20131B4B0BC5239B7D2EF65B1D31630E7347A90CD65DE347168208B815F3EE77', TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
        //await AuthService.login();
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Test;