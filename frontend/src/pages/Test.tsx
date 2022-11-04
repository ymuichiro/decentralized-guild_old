import { AuthService } from '../service/AuthService'
import QuestService from '../service/QuestService'
import { TEST_DATA } from '../config';

const Test = (): JSX.Element => {
    const handleLogin = async () => {
        await QuestService.receivedQuest('contract_id', '4C4BD7F8E1E1AC61DB817089F9416A7EDC18339F06CDC851495B271533FAD13B', TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
        //await AuthService.login();
    }
    return(
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Test;