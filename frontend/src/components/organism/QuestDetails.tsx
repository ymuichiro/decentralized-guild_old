import Modal from "@mui/material/Modal";
import Typography from "../atom/Typography";
import Box from "../atom/Box";
import Slide from "../atom/Slide";
import Button from "../moleculs/Button";
import { components } from "../../@types/swagger";

type Props = {
  /** true = open */
  isOpen: boolean;
  onClose?: () => void;
  quest?: components["schemas"]["Quest"];
}

/**
 * Display quest details when clicked in the quest list
 */
export default function QuestDetails(props: Props): JSX.Element {

  const onClickModalCloseRequest = () => {
    if (props.onClose) props.onClose();
  }

  return <Modal
    open={props.isOpen}
    onClose={props.onClose}
    aria-labelledby="quest-detail-modal"
    aria-describedby="showing-quest-details"
    closeAfterTransition
    style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}
  >
    <Slide direction="down" in={props.isOpen} mountOnEnter unmountOnExit
    >
      <Box sx={(theme) => ({
        width: "70vw",
        height: "90vh",
        bgcolor: 'background.paper',
        border: `2px solid ${theme.palette.primary.contrastText}`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[24],
        p: 4,
      })}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", height: "100%" }}>
          <div style={{ flexGrow: 1 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <pre style={{ overflow: "hidden" }}>
                <code>
                  {JSON.stringify(props.quest, null, 2)}
                </code>
              </pre>
            </Typography>
          </div>
          <Button onClick={() => onClickModalCloseRequest()}>
            閉じる
          </Button>
        </div>
      </Box>

    </Slide>
  </Modal>
}

