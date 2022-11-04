import { AuthService } from '../service/AuthService'
import QuestService from '../service/QuestService'
import { TEST_DATA } from '../config';
import { getActivePublicKey } from 'sss-module'
interface SSSWindow extends Window {
    SSS: any;
  }
  declare const window: SSSWindow;

const Test = (): JSX.Element => {
    const handleLogin = async () => {
        await QuestService.receivedQuest('contract_id', 'A890D229FEBDADEDD5B7D1DBDF2B4BECD21CCDCD15C420FC986CE8BBC2C972E4', TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
        //await AuthService.login();
    }
    return(
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Test;