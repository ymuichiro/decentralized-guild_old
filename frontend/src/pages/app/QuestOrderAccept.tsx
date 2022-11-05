import { components } from '../../@types/swagger';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTER_PATHS } from '../../Root';
import QuestDetailsRequestAccept from '@components/organism/QuestDetailsRequestAccept';
import { ApiService } from '@service/ApiService';
import QuestService from '@service/QuestService';
import { SymbolExplorerService } from '@service/SymbolExplorerService';
import { TEST_DATA } from '../../config'
type Props = {
  notificationId: string;
};

type NotificationMetaData = {
  questId: number;
  worker_public_key: string;
  message: string;
};

/**
 * 通知がきているクエスト受注依頼の画面を表示する
 *
 * ハッカソンの対応範囲としてはここまでとする。受注を押したら画面にAlertを出して、「体験版はここまで！ 契約書がBlockchainに刻まれました。こちらのエクスプローラーURLをご確認ください！ と表示して、契約書を見せるところまで）
 */
const QuestOrderAccept = (): JSX.Element => {
  const { notificationId } = useParams<Props>();
  const [notification, setNotification] = useState<
    components['schemas']['NoticeTable'] | null
  >(null);
  const [questInfo, setQuestInfo] = useState<components["schemas"]["QuestTable"] | null>(null);
  const navigate = useNavigate();

  if (!notificationId || Number(notificationId).toString() === 'NaN') {
    // alert("正しくない画面遷移を検出しました");
    // navigate(ROUTER_PATHS.dashboard.path);
    // return <div />
  }

  useEffect(() => {
    // notificationId より詳細な notification 情報とクエストの情報を取得
    ApiService.getNotice({ noticeId: Number(notificationId) }).then(
      (noticeInfo) => {
        setNotification(noticeInfo.data);
        const notificationMeta: NotificationMetaData = JSON.parse(noticeInfo.data?.body || '{}');
        ApiService.getQuest({ quest_id: notificationMeta.questId }).then(quest => {
          console.log("tttt", quest);
          if (quest.data) {
            setQuestInfo(quest.data);
          }
        })
      }
    );
  }, []);

  /** クエストを受ける時 */
  const onSubmitHandle = async () => {
    // TODO: サーバー側にトランザクション発行依頼を行い、契約内容をブロックチェーンに刻む
    if(!questInfo) throw new Error('quest info is undefind');
    // contract_idはquest_idで良いのかな
    const hash = await QuestService.receivedQuest(questInfo.quest_id.toString(), questInfo.requester_public_key, TEST_DATA.FEE, TEST_DATA.NODE, TEST_DATA.NETWORK);
    // ハッカソンでの対応としてはここまでで一旦終わりとする。最後にアラートか何かでブロックチェーンエクスプローラーの該当のトランザクション情報を表示し、「書き込めましたね？」と示ればOk
    console.log("このデータを使ってトランザクションを発行する", questInfo, notification)
    window.open(
      SymbolExplorerService.getUrlForTransaction(
        hash,
        Number(import.meta.env.VITE_NETWORK_TYPE),
      ),
      '_blank',
    );
  };

  /** クエストを受けない時 */
  const onRejectHandle = () => {
    // ハッカソン中では対応不要
    alert(
      'ハッカソン期間中の体験版はここまでです。お試し頂きありがとうございます！',
    );
    navigate(ROUTER_PATHS.dashboard.path);
  };

  return (
    <div>
      {
        questInfo && <QuestDetailsRequestAccept
          isOpen={notificationId ? true : false}
          onSubmitHandle={() => onSubmitHandle()}
          onRejectHandle={() => onRejectHandle()}
          quest={questInfo}
        />
      }
    </div>
  );
};

export default QuestOrderAccept;
