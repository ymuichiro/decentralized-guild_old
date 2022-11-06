import Avatar from "@components/atom/Avatar";
import Card from "@components/atom/Card";
import CardContent from "@components/atom/CardContent";
import Typography from "@components/atom/Typography";
import Grid from "@components/atom/Grid";
import { components } from "../../@types/swagger";
import { useEffect, useState } from "react";

type Props = {
  user: components["schemas"]["UserTable"] | null;
}

/**
 * ユーザーの基本情報を表示するカード
 */
export default function ProfileCard(props: Props): JSX.Element {
  const [xymAmount, setXymAmount] = useState<number>(0);
  const [wrpAmount, setWrpAmount] = useState<number>(0); // ハッカソン以降に実装
  const [gptAmount, setGptAmount] = useState<number>(0); // ハッカソン以降に実装

  useEffect(() => {
    // TODO: ユーザーのアドレスを元に、残高を取得する
    // TODO: ユーザーのパブリックキーを元に、WRTGPTを取得する
  }, [])

  return <Card style={{ width: "100%" }}>
    <CardContent>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={2}>
          <Avatar src={undefined} style={{ width: "100%", height: "auto", aspectRatio: "1/1" }} />
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1" fontWeight="bold">
            {props.user?.name}
          </Typography>
          <Typography variant="body2">
            {props.user?.created && new Date(props.user.created).toLocaleDateString()}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant="h6" fontWeight="bold" textAlign="right" gutterBottom style={{ marginTop: "3px" }}>
        {xymAmount.toLocaleString()} XYM
      </Typography>
      <Typography variant="body1" textAlign="right">{wrpAmount.toLocaleString()} WRP</Typography>
      <Typography variant="body1" textAlign="right">{gptAmount.toLocaleString()} GPT</Typography>
    </CardContent>
  </Card >;
};