import { useEffect, useState } from 'react';
import Container from '@components/atom/Container';
import Typography from '@components/atom/Typography';
import InputBox from '@components/moleculs/InputBox';
import Button from '@components/moleculs/Button';
import UserJoinForm from '@components/template/UserJoinForm';
import MailOutline from '@mui/icons-material/MailOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '../../Root';
import { useSetRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';
import SystemService from '@service/SystemService';
import { ApiService } from '@service/ApiService';

const Join = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [publicKey, setPublicKey] = useState<string>('');
  const rSetUserInfo = useSetRecoilState(userInformationState);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const account = SystemService.getActivePublicAccount()
      const accountName = SystemService.getActiveAccountNameFromSSS();
      setPublicKey(account.publicKey);
      setName(accountName);
    } catch {
      navigate(ROUTER_PATHS.top.path);
    }
  }, [])

  /** if join is success */
  const handleSubmit = async () => {
    const o = { public_key: publicKey, icon: DEFAULT_PROFILE_ICON, name };
    try {
      if (publicKey && email && name) {
        const res = await ApiService.addUser(o)
        if (res.data.status === "ok") {
          rSetUserInfo(o)
          navigate(ROUTER_PATHS.dashboard.path);
        }
      } else {
        throw new Error("全て入力して下さい");
      }
    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
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
          Welcome to Guild
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
            caption='PublicKey（自動入力）'
            icon={<BadgeIcon />}
            value={publicKey}
            disabled
          />
          <InputBox
            caption='Nickname（自動入力）'
            icon={<BadgeIcon />}
            value={name}
            disabled
          />
          <Button onClick={handleSubmit} >Join Guild</Button>
        </UserJoinForm>
      </div>
    </Container>
  );
};

// prettier-ignore
const DEFAULT_PROFILE_ICON = "data:image/png;base64,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"

export default Join;
