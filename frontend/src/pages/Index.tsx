import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Container from '@components/atom/Container';
import Typography from '@components/atom/Typography';
import Button from '@components/moleculs/Button';
import LoadingWrap from '@components/moleculs/LoadingWrap';
import { AuthService } from '@service/AuthService';
import { ROUTER_PATHS } from '../Root';

interface SSSWindow extends Window {
  SSS: any;
}
declare const window: SSSWindow;

const Index = (): JSX.Element => {
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    // SSS による署名検証の後、未登録ユーザの場合は新規登録、それ以外はダッシュボードへ飛ぶ
    if (!window.SSS) {
      return alert('Allow this page in SSS Extension and retry to connect wallet');
    }
    setLoading(true);
    try {
      await AuthService.login();
      const res = await AuthService.getUser();
      if (res) {
        setUserInformation(res);
        navigate(ROUTER_PATHS.dashboard.path);
      } else {
        navigate(ROUTER_PATHS.join.path);
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInformation) {
      navigate(ROUTER_PATHS.dashboard.path);
    }
  }, []);

  return (
    <Container maxWidth={'md'}>
      <div
        style={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h2' fontWeight='bold'>
          Decentralized Guild
        </Typography>
        <Button onClick={handleLogin}>Connect Wallet</Button>
      </div>
      {loading && <LoadingWrap />}
    </Container>
  );
};

export default Index;
