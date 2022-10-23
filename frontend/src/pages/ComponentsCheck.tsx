import GradientBox from "../components/atom/GradientBox";
import Grid from "../components/atom/Grid";
import TextField from "../components/atom/TextField";
import Typography from "../components/atom/Typography";
import Button from "../components/moleculs/Button";
import QuestCard from "../components/organism/QuestCard";
import QuestCardList from "../components/template/QuestCardList";
import { QuestModel } from "../models/Quest";

const QUEST_CARD_DATA_SAMPL: QuestModel[] = [
  {
    id: "1",
    info: {
      title: "quest A ",
      description: "I really want to eat sushi now. Is there a craftsman who can make sushi at home?",
      imagePath: "/assets/logo/decentralize-guild-twitter-card.png",
      reward: 100,
    }
  },
  {
    id: "2",
    info: {
      title: "quest b quest b",
      description: "I really want to eat sushi now. Is there a craftsman who can make sushi at home?",
      imagePath: "/assets/logo/decentralize-guild-twitter-card.png",
      reward: 100,
    }
  },
  {
    id: "3",
    info: {
      title: "quest c quest c quest c quest c",
      description: "I really want to eat sushi now. Is there a craftsman who can make sushi at home?",
      imagePath: "/assets/logo/decentralize-guild-twitter-card.png",
      reward: 10000000000000,
    }
  },
]

export default function ComponentsCheck() {

  return <div style={{ height: "100vh", width: "100%", display: "flex", flexDirection: "column", gap: "30px", justifyContent: "center", alignItems: "center" }}>
    <Typography component="h1" variant="h5" fontWeight="bold">Components</Typography>
    <Button color="primary">
      themed button primary & size normal
    </Button>
    <Button color="secondary" size="small">
      themed button secondary & size small
    </Button>

    <GradientBox style={{ width: "90vw", padding: "10px" }}>
      <Typography component="h1" variant="h5" fontWeight="bold" textAlign="center" gutterBottom>Quest Board</Typography>
      <QuestCardList items={QUEST_CARD_DATA_SAMPL} />
    </GradientBox>
  </div >

}