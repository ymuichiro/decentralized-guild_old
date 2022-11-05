import Card from '@components/atom/Card';
import CardContent from '@components/atom/CardContent';
import Typography from '@components/atom/Typography';
import { components } from '../../@types/swagger';
import { useEffect, useState } from 'react';
import List from '@components/atom/List';
import ListItemText from '@components/atom/ListItemText';
import ListItemButton from '@components/atom/ListItemButton';
import ScrollBox from '@components/atom/ScrollBox';

type Props = {
  user: components['schemas']['UserTable'] | null;
};

/**
 * ユーザーの基本情報を表示するカード
 */
export default function NotificationsCard(props: Props): JSX.Element {
  const [notifications, setNotifications] = useState<
    components['schemas']['Notice'][]
  >([
    { title: "test data", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
    { title: "ttttt", body: "fakpoajtpotpa", created: 100000000, public_key: "xxxxxxxxxxxxxxx" },
  ]);

  useEffect(() => {
    // TODO: ユーザーのパブリックキーを元に、待機中の通知を取得しsetNotificationsへ格納する
  }, []);

  const onClickNotification = (item: components['schemas']['Notice']) => {
    // TODO: item.body に JSON 形式の文字列が格納されている為、PARSE して、 Quest ID を取り出して、Quest受注承認ページへアクセスさせる
    // JSON.parse(item.body);
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
