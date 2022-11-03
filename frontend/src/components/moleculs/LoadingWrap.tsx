import Typography from '@components/atom/Typography';
import { Image } from '@mui/icons-material';

import Spinner from '../../assets/spinner.svg';

const LoadingWrap = (): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        position: 'absolute',
        backgroundColor: '#00000088',
        top: 0,
        left: 0,
        zIndex: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={'/assets/loading/spinner.svg'} />
    </div>
  );
};

export default LoadingWrap;
