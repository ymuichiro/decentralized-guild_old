import { useState } from 'react';

import Container from '@components/atom/Container';
import Typography from '@components/atom/Typography';
import InputBox from '@components/moleculs/InputBox';
import Button from '@components/moleculs/Button';

import UserJoinForm from '@components/template/UserJoinForm';

import MailOutline from '@mui/icons-material/MailOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import LinkIcon from '@mui/icons-material/Link';
import { useNavigate } from 'react-router-dom';

interface SSSWindow extends Window {
  SSS: any;
}
declare const window: SSSWindow;

const Join = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [profileUrl, setProfileUrl] = useState<string>('');

  const navigate = useNavigate();

  const handleJoin = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth='md'>
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          component='h1'
          variant='h4'
          fontWeight='bold'
          style={{ padding: 24 }}
        >
          Welcome to D-Guild
        </Typography>
        <UserJoinForm title='Submit Form' subtitle='input your information'>
          <InputBox
            caption='E-Mail'
            icon={<MailOutline />}
            value={email}
            placeholder='Input your E-mail'
            onChange={(data: string) => {
              setEmail(data);
            }}
          />
          <InputBox
            caption='Address'
            icon={<BadgeIcon />}
            value={window.SSS?.activePublicKey}
            disabled
          />
          <InputBox
            caption='Nickname'
            icon={<BadgeIcon />}
            value={window.SSS?.activeName}
            disabled
          />
          <InputBox
            caption='Profile URL'
            icon={<LinkIcon />}
            value={profileUrl}
            placeholder='Input your profile image link'
            onChange={(data: string) => {
              setProfileUrl(data);
            }}
          />
          <Button onClick={handleJoin}>Join D-Guild</Button>
        </UserJoinForm>
      </div>
    </Container>
  );
};

export default Join;
