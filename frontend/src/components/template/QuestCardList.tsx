import { useState } from "react";
import { QuestModel } from "../../models/Quest";
import Grid from "../atom/Grid";
import QuestCard from "../organism/QuestCard";
import QuestDetails from "../organism/QuestDetails";

type Props = {
  items: QuestModel[];
}

/**
 * Display a list of quests waiting to be accepted
 */
export default function QuestCardList(props: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentQuest, setCurrentQuest] = useState<string>("");

  const onClickQuestDetailOpenRequest = (questId: string) => {
    setCurrentQuest(questId)
    setIsModalOpen(true);
  }

  return <Grid container spacing={3} alignItems="stretch">
    {
      props.items.map((item, index) => <Grid item xs={12} sm={6} md={4} key={index}>
        <QuestCard
          title={item.info.title}
          description={item.info.description}
          imagePath={item.info.imagePath}
          reward={item.info.reward}
          onClick={() => onClickQuestDetailOpenRequest(item.id)}
          containerStyle={{ height: "100%" }}
        />
      </Grid>)
    }
    <QuestDetails
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      quest={props.items.find((e => e.id === currentQuest))}
    />

  </Grid>
}