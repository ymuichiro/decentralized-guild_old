import GradientBox from '@components/atom/GradientBox';
import IconButton from '@components/atom/IconButton';
import Typography from '@components/atom/Typography';
import QuestCardList from '@components/template/QuestCardList';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import { ROUTER_PATHS } from '../../Root';
import { ApiService } from '@service/ApiService';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { components } from '../../@types/swagger';

/** Quest 一覧の表示 */
const Quests = (): JSX.Element => {
  const navigate = useNavigate();
  const [quests, setQuests] = useState<components['schemas']['QuestTable'][]>(
    [],
  );

  useEffect(() => {
    ApiService.getQuests().then((res) => {
      setQuests([...res.data]);
    });
  }, []);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '1%',
          right: '1%',
        }}
      >
        <IconButton
          onClick={() => navigate(ROUTER_PATHS.dashboard.path)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <DashboardOutlinedIcon />
          <Typography variant='caption'>Dashboard</Typography>
        </IconButton>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          WebkitTransform: 'translate(-50%, -50%)',
          msTransform: 'translate(-50%, -50%)',
        }}
      >
        <GradientBox style={{ width: '90vw', height: '80vh', padding: '50px' }}>
          <Typography
            component='h1'
            variant='h4'
            fontWeight='bold'
            textAlign='center'
            style={{ paddingBottom: '50px' }}
          >
            Quest Board
          </Typography>
          <QuestCardList items={quests} />
        </GradientBox>
      </div>
    </>
  );
};

export default Quests;
