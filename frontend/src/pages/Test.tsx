import { AuthService } from '../service/AuthService';
import QuestService from '../service/QuestService';
import { TEST_DATA } from '../config';

interface SSSWindow extends Window {
    SSS: any;
}
declare const window: SSSWindow;

const Test = (): JSX.Element => {
    const handleLogin = async () => {
        await QuestService.receivedQuest('contract_id', 'B055C6F655CD3101A04567F9499F24BE7AB970C879887BD3C6644AB7CAA22D22', TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
        //await AuthService.login(TEST_DATA.NETWORK);
    }
    return(
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Test;