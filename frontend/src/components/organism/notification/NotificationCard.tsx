import Avatar from '@components/atom/Avatar';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Typography from '@components/atom/Typography';
import IconButton from '@components/atom/IconButton';

import SettingsIcon from '@mui/icons-material/Settings';
import MosaicBox from '@components/moleculs/MosaicBox';
import NotificationBox from '@components/moleculs/NotificationBox';

const NOTIFICATION_CARD_TEST_EXAMPLE = [
  {
    title: 'Quest #1 was completed !',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    publicKey: 'ABC',
    created: new Date(),
  },
  {
    title: 'Quest #2 was completed !',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    publicKey: 'ABC',
    created: new Date(),
  },
  {
    title: 'New guild member is comming !',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    publicKey: 'ABC',
    created: new Date(),
  },
  {
    title: 'New guild member is comming !',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    publicKey: 'ABC',
    created: new Date(),
  },
  {
    title: 'New guild member is comming !',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    publicKey: 'ABC',
    created: new Date(),
  },
  {
    title: 'New guild member is comming !',
    body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    publicKey: 'ABC',
    created: new Date(),
  },
];

const NotificationCard = (): JSX.Element => {
  const [userInformation, setUserInformation] =
    useRecoilState(userInformationState);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#222',
        borderRadius: 12,
        padding: 18,
        width: '100%',
        justifyContent: 'space-between',
        minHeight: 360,
      }}
    >
      <Typography component='h5' variant='h6'>
        Notification
      </Typography>
      <div style={{ maxHeight: 300, overflow: 'auto' }}>
        {NOTIFICATION_CARD_TEST_EXAMPLE.map((item) => {
          return <NotificationBox notice={item} />;
        })}
      </div>
    </div>
  );
};

export default NotificationCard;
