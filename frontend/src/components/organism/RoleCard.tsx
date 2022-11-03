import Card from '@components/atom/Card';
import CardActions from '@components/atom/CardActions';
import CardContent from '@components/atom/CardContent';
import CardMedia from '@components/atom/CardMedia';
import Typography from '@components/atom/Typography';
import Button from '@components/moleculs/Button';

import { RoleModel } from '../../models/Role';

interface RoleCardProps extends Partial<RoleModel> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  containerStyle?: React.CSSProperties;
}

const RoleCard = ({
  onClick,
  containerStyle,
  imagePath,
  name,
  description,
}: RoleCardProps): JSX.Element => {
  return (
    <div
      style={{
        ...containerStyle,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <img
        src={imagePath}
        style={{ width: 200, height: 200, borderRadius: 100 }}
      />
      <Typography variant='h4' component='h1'>
        {name}
      </Typography>
      <Typography>{description}</Typography>
      <Button onClick={onClick} size='2x'>
        Select {name}
      </Button>
    </div>
  );
};

export default RoleCard;
