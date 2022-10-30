import Typography from '@components/atom/Typography';

export interface UserJoinFormProps {
  title: string;
  subtitle: string;
  children?: any;
  footer?: any;
}

const UserJoinForm = ({
  title,
  subtitle,
  children,
  footer,
}: UserJoinFormProps): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        backgroundColor: '#333',
        borderRadius: 12,
        padding: 24,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant='h5'>{title}</Typography>
        <Typography variant='h6'>{subtitle}</Typography>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            marginTop: 24,
          }}
        >
          {children}
        </div>
      </div>
      {footer}
    </div>
  );
};

export default UserJoinForm;
