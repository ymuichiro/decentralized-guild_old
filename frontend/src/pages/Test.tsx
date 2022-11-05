import { AuthService } from '../service/AuthService'
import QuestService from '../service/QuestService'
import { TEST_DATA } from '../config';

const Test = (): JSX.Element => {
    const handleLogin = async () => {
        await QuestService.receivedQuest('contract_id', '20131B4B0BC5239B7D2EF65B1D31630E7347A90CD65DE347168208B815F3EE77', TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
        //await AuthService.login();
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Test;