import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import IconButton from '@components/atom/IconButton';
import Container from '@components/atom/Container';
import Grid from '@components/atom/Grid';
import ProfileCard from '@components/organism/user/ProfileCard';
import NotificationCard from '@components/organism/notification/NotificationCard';
import Board from '@components/template/Board';

import ListIcon from '@mui/icons-material/List';
import MenuIcon from '@mui/icons-material/Menu';

interface SSSWindow extends Window {
  SSS: any;
}
declare const window: SSSWindow;

const Dashboard = (): JSX.Element => {
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);

  useEffect(() => {
    setTimeout(() => {
      setUserInformation({
        publicKey: window.SSS?.activePublicKey,
        name: window.SSS?.activeName,
        icon: 'https://avatars.githubusercontent.com/u/10491607?v=4',
      });
    }, 350);
  }, []);

  return (
    <Container
      maxWidth='xl'
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid container spacing={3} columns={{ xs: 6, md: 12 }} height={'100%'}>
        <Grid
          xs={6}
          md={3}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          padding={2}
          gap={2}
        >
          <ProfileCard />
          <NotificationCard />
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <p>Powered By</p>
            <img src='/assets/logo/symbol-logo-watermark.svg' height={24} />
          </div>
        </Grid>
        <Grid
          xs={6}
          md={9}
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
        >
          <div style={{ marginLeft: 'auto' }}>
            <IconButton>
              <MenuIcon fontSize='large' />
            </IconButton>
          </div>
          <Board title='Dashboard'></Board>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
