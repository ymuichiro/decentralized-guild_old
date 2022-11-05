import Card from '@components/atom/Card';
import CardContent from '@components/atom/CardContent';
import Typography from '@components/atom/Typography';
import { components, operations } from '../../@types/swagger';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import List from '@components/atom/List';
import ListItemText from '@components/atom/ListItemText';
import ListItemButton from '@components/atom/ListItemButton';
import ScrollBox from '@components/atom/ScrollBox';
import { ApiService } from '../../service/ApiService'
import SystemService from '../../service/SystemService'
type Props = {
  user: components['schemas']['UserTable'] | null;
};

/**
 * ユーザーの基本情報を表示するカード
 */
export default function NotificationsCard(props: Props): JSX.Element {
  const [notifications, setNotifications] = useState<
    components['schemas']['Notice'][]
  >(
    [/*
    { title: "test data", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
  */]
  );
  const navigate = useNavigate();

  useEffect(() => {
    ApiService.getNotices({public_key: SystemService.getActivePublicAccount().publicKey})
    .then((res)=>{
      console.log(res.data);
      setNotifications([...res.data])
    })
  }, []);

  const onClickNotification = (item: components['schemas']['Notice']) => {
    const notification: operations['orderRequestQuest']['requestBody']['content']['application/json'] = JSON.parse(item.body);
    // ここで取得できるのはquest_idだが、おそらく必要なのはnotice_idではないか、受注通知（onClickReceiveRequest）の段階でnotice_idは登録されていないように思われるが、深追いできなかったので断念
    navigate('/quest-order-accept/' + notification.quest_id);
  }

  return (
    <Card style={{ height: "100%" }}>
      <CardContent>
        <Typography variant='h5' fontWeight='bold'>
          Notifications
        </Typography>
        <ScrollBox style={{ height: "100%" }}>
          <List>
            {notifications.map((item, index) => (
              <ListItemButton key={index.toString()} divider onClick={() => onClickNotification(item)}>
                <ListItemText primary={item.title} secondary={item.created} />
              </ListItemButton>
            ))}
          </List>
        </ScrollBox>
      </CardContent>
    </Card>
  );
}
