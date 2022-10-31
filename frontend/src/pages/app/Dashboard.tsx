import { useEffect } from 'react';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Container from '@components/atom/Container';
import Grid from '@components/atom/Grid';
import ProfileCard from '@components/organism/user/ProfileCard';
import NotificationCard from '@components/organism/notification/NotificationCard';
import Board from '@components/template/Board';

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
        <Grid xs={6} md={9}>
          <div style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
            <p>Symbol DAO World</p>
            <div>
              <p>100,000 GDP / day</p>
              <p>100 user / day</p>
            </div>
          </div>
          <Board title='Dashboard' />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
