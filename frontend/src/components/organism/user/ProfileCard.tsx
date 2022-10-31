import { useEffect, useState } from 'react';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Avatar from '@components/atom/Avatar';
import Typography from '@components/atom/Typography';
import IconButton from '@components/atom/IconButton';

import MosaicBox from '@components/moleculs/MosaicBox';

import SettingsIcon from '@mui/icons-material/Settings';

const ProfileCard = (): JSX.Element => {
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);

  const [symbol, setXYM] = useState<number>(0);
  const [xpt, setXPT] = useState<number>(0);
  const [gpt, setGPT] = useState<number>(0);

  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#222',
        borderRadius: 12,
        padding: 12,
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        {userInformation && (
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={userInformation.name}
            src={userInformation.icon}
          />
        )}

        <div style={{ marginRight: 'auto', marginLeft: 20 }}>
          <Typography variant='subtitle1'>{userInformation?.name}</Typography>
          <Typography variant='subtitle2' color='#888'>
            worker, guild owner
          </Typography>
        </div>

        <IconButton color='primary'>
          <SettingsIcon />
        </IconButton>
      </div>
      <div style={{ flex: 3 }}>
        <MosaicBox size='2x' ticker='XYM' divisibility={6} />
        <MosaicBox size='normal' ticker='GPT' />
        <MosaicBox size='normal' ticker='WPT' />
      </div>
    </div>
  );
};

export default ProfileCard;
