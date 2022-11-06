 import { AuthService } from '../service/AuthService'
 import { ApiService } from '../service/ApiService'
import SystemService from '../service/SystemService'
import QuestService from '../service/QuestService'
import GuildService from '../service/GuildService'
import { TEST_DATA } from '../config';
import { Evaluation } from '../models/Quest';
import { operations } from '../@types/swagger';

const Test = (): JSX.Element => {
    ApiService.getQuests()
    .then((quests)=>{
        console.log(quests);
    });
    const addQuest = async () => {
        const body: operations["addQuest"]["requestBody"]["content"]["application/json"] = {
            quest_id: 1,
            nominate_guild_id: undefined,
            transaction_hash: undefined,
            title: 'title_test',
            description: 'description_test',
            reward: 1,
            requester_public_key: 'E6057C1C36A8BAFE78D0ECDB22BF101530F829CB7A33E42D3716368E59DECFE2',
            worker_public_key: undefined,
            status: 'WANTED'
        }
        const res = await ApiService.addQuest(body)
        console.log(res);
    }
    const joinGuild = async () => {
        await GuildService.joinRequest(TEST_DATA.GUILD_OWNER.KEY.PUBLIC, TEST_DATA.GUILD_OWNER.MOSAIC_ID.LOW_MOSAIC_ID, TEST_DATA.NODE, TEST_DATA.NETWORK);
    }
    const establishGuild = async () => {
        await GuildService.establishGuild(100000000, TEST_DATA.NETWORK, TEST_DATA.NODE);
    }
    const receivedQuest = async () => {
        await QuestService.receivedQuest('contract_id', 'E6057C1C36A8BAFE78D0ECDB22BF101530F829CB7A33E42D3716368E59DECFE2', TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
    }
    const completeQuest = async () => {
        await QuestService.completeQuest(
            'DF12CE4353D9F93FD51FBAED330C2D27721C07E4767959409CBA45D382408F22',
            1,
            Evaluation.GOOD,
            Evaluation.GOOD,
            TEST_DATA.FEE,
            TEST_DATA.NODE,
            TEST_DATA.NETWORK
        )
    }
    const login = async () => {
        await AuthService.login();
    }
    return (
        <div style={{margin: '30px'}}>
            <button onClick={addQuest}>AddQuest</button><br />
            <button onClick={joinGuild}>JoinGuild</button><br />
            <button onClick={receivedQuest}>ReceivedQuest</button><br />
            <button onClick={completeQuest}>CompleteQuest</button><br />
            <button onClick={establishGuild}>EstablishGuild</button><br />
            <button onClick={login}>Login</button><br />
        </div>
    );
}
export default Test;