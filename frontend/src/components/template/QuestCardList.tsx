import { useState } from "react";
import Grid from "../atom/Grid";
import QuestCard from "../organism/QuestCard";
import QuestDetails from "../organism/QuestDetails";
import { components } from "../../@types/swagger";

type Props = {
  items: components["schemas"]["QuestTable"][];
}

/**
 * Display a list of quests waiting to be accepted
 */
export default function QuestCardList(props: Props): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentQuest, setCurrentQuest] = useState<number>(NaN);

  const onClickQuestDetailOpenRequest = (questId: number) => {
    setCurrentQuest(questId)
    setIsModalOpen(true);
  }

  return <Grid container spacing={3} alignItems="stretch">
    {
      props.items.map((item, index) => <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
        <QuestCard
          title={item.title}
          description={item.description}
          reward={item.reward}
          onClick={() => onClickQuestDetailOpenRequest(item.quest_id)}
          containerStyle={{ height: "100%" }}
        />
      </Grid>)
    }
    <QuestDetails
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      quest={props.items.find((e => e.quest_id === currentQuest))}
    />

  </Grid>
}