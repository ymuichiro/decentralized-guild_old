import { components } from "../../@types/swagger";
import Card from "../atom/Card";
import CardActions from "../atom/CardActions";
import CardContent from "../atom/CardContent";
import Typography from "../atom/Typography";
import Button from "../moleculs/Button";

interface Props extends Partial<components["schemas"]["Quest"]> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  containerStyle?: React.CSSProperties;
}

/**
 * A quest card that is displayed in the quest list.
 */
export default function QuestCard(props: Props): JSX.Element {
  return <Card sx={(theme) => ({ ...props.containerStyle, display: "flex", flexDirection: "column", justifyContent: "stretch", backgroundColor: theme.palette.grey["900"] })}>
    <CardContent style={{ flexGrow: 1 }}>
      <Typography gutterBottom variant="h6" component="div" fontWeight="bold" whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
        {props.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={{ minHeight: "150px" }}>
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