import { AuthService } from '../service/AuthService'
import { TEST_DATA } from '../config';
import { getActivePublicKey } from 'sss-module'
interface SSSWindow extends Window {
    SSS: any;
}
declare const window: SSSWindow;

const Test = (): JSX.Element => {
    const handleLogin = async () => {
        await AuthService.login();
    }
    return (
        <div>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}
export default Test;