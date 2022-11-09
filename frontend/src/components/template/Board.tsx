import { ReactElement } from 'react';

import { useRecoilState } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

import Typography from '@components/atom/Typography';

export interface BoardProps {
  title: string;
  children: ReactElement;
}

const Board = ({ title, children }: BoardProps): JSX.Element => {
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
      {children}
    </div>
  );
};

export default Board;
