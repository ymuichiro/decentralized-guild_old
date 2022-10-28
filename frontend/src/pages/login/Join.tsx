import Typography from '@components/atom/Typography';
import RoleCardList from '@components/template/RoleCardList';

import { RoleModel } from 'models/Role';

const ROLE_CARD_DATA: RoleModel[] = [
  {
    id: '1',
    name: 'Worker',
    description: 'Doing something awesome job & get rewards',
    imagePath: '/assets/logo/decentralize-guild-twitter-card.png',
  },
  {
    id: '2',
    name: 'Guild Owner',
    description: 'Make your guild & get Big funds',
    imagePath: '/assets/logo/decentralize-guild-twitter-card.png',
  },
  {
    id: '3',
    name: 'Investor',
    description: 'Invest something awesome Project & raise up your funds',
    imagePath: '/assets/logo/decentralize-guild-twitter-card.png',
  },
];

const Join = (): JSX.Element => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography component='h1' variant='h4' fontWeight='bold'>
        Get Your Role
      </Typography>
      <RoleCardList
        items={ROLE_CARD_DATA}
        onClick={(e: RoleModel) => {
          console.log('Click Role Card > ', e);
        }}
      />
    </div>
  );
};

export default Join;
