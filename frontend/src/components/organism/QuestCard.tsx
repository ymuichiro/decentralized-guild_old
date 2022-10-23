import { QuestInfoModel, QuestModel } from "../../models/Quest";
import Card from "../atom/Card";
import CardActions from "../atom/CardActions";
import CardContent from "../atom/CardContent";
import CardMedia from "../atom/CardMedia";
import Typography from "../atom/Typography";
import Button from "../moleculs/Button";

interface Props extends Partial<QuestInfoModel> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  containerStyle?: React.CSSProperties;
}

/**
 * A quest card that is displayed in the quest list.
 */
export default function QuestCard(props: Props): JSX.Element {
  return <Card style={{ ...props.containerStyle, display: "flex", flexDirection: "column", justifyContent: "stretch" }}>
    <CardMedia
      component="img"
      alt="quest-card-media"
      height="140"
      image={props.imagePath}
    />
    <CardContent style={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="div" fontWeight="bold" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {props.description && props.description?.length > 100 ? props.description?.slice(0, 100) + "..." : props.description?.slice(0, 100)}
      </Typography>
    </CardContent>
    <CardContent style={{ paddingTop: "0px", paddingBottom: "0px" }}>
      <Typography gutterBottom variant="body1" component="div" fontWeight="bold" whiteSpace="nowrap" overflow="hidden" textAlign={"right"}>
        {props.reward?.toLocaleString()} xym
      </Typography>
    </CardContent>
    <CardActions style={{ justifyContent: "center" }}>
      <Button size="small" onClick={props.onClick}>詳細を確認する</Button>
    </CardActions>
  </Card>
}