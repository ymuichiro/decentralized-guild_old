import { Notice } from '@models/Notice';

import IconButton from '@components/atom/IconButton';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloseIcon from '@mui/icons-material/Close';

import IconText from '@components/moleculs/IconText';

export interface NotificationBoxProps {
  notice: Notice;
}

const NotificationBox = ({ notice }: NotificationBoxProps): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff22',
        padding: 12,
        margin: 0,
        marginTop: 8,
        marginRight: 12,
        borderRadius: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ fontSize: 14, margin: 4 }}>{notice?.title}</p>
          <IconButton
            color='error'
            style={{ padding: 0, position: 'relative', top: -8, right: -2 }}
          >
            <CloseIcon />
          </IconButton>
        </div>

        <IconText
          content={notice?.created.toLocaleString()}
          icon={<AccessTimeIcon fontSize='inherit' color='disabled' />}
          style={{ fontSize: 12, margin: 0, textAlign: 'right', color: '#888' }}
        />
      </div>
      <p
        style={{
          fontSize: 12,
          margin: 0,
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {notice?.body}
      </p>
    </div>
  );
};

export default NotificationBox;
