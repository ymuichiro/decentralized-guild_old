import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Container from '@components/atom/Container';
import Typography from '@components/atom/Typography';
import Button from '@components/moleculs/Button';
import LoadingWrap from '@components/moleculs/LoadingWrap';

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
    if (!window.SSS) {
      alert('Allow this page in SSS Extension and retry to connect wallet');
    } else {
      navigate('/join');
      // try {
      //   // call user information
      //   setUserInformation({
      //     publicKey: window.SSS?.activePublicKey,
      //     name: window.SSS?.activeName,
      //     icon: 'https://avatars.githubusercontent.com/u/10491607?v=4',
      //   });
      //   navigate('/dashboard');
      // } catch {
      //   navigate('/join');
      // }
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userInformation) {
      navigate('/dashboard');
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
