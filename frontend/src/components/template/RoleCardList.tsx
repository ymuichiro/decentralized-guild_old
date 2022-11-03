import { useState } from 'react';

import { RoleModel } from '../../models/Role';

import Grid from '@components/atom/Grid';
import RoleCard from '@components/organism/RoleCard';
import QuestDetails from '@components/organism/QuestDetails';

type RoleCardListProps = {
  items: RoleModel[];
  onClick: (value: RoleModel) => void;
};

const RoleCardList = ({ items, onClick }: RoleCardListProps): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentQuest, setCurrentQuest] = useState<string>('');

  const onClickQuestDetailOpenRequest = (questId: string) => {
    setCurrentQuest(questId);
    setIsModalOpen(true);
  };

  return (
    <Grid container spacing={3} alignItems='stretch'>
      {items.map((item, index) => (
        <Grid item xs={12} sm={12} md={4} key={index}>
          <RoleCard
            name={item.name}
            description={item.description}
            imagePath={item.imagePath}
            onClick={() => onClick(item)}
            containerStyle={{ height: '100%' }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default RoleCardList;
