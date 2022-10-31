import Avatar from '@components/atom/Avatar';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Typography from '@components/atom/Typography';
import IconButton from '@components/atom/IconButton';

import SettingsIcon from '@mui/icons-material/Settings';
import MosaicBox from '@components/moleculs/MosaicBox';

export interface BoardProps {
  title: string;
}

const Board = ({ title }: BoardProps): JSX.Element => {
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
        height: '80%',
        justifyContent: 'space-between',
        minHeight: 500,
      }}
    >
      <Typography component='h5' variant='h6'>
        {title}
      </Typography>
    </div>
  );
};

export default Board;
