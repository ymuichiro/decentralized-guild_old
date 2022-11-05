import Box from '@components/atom/Box';
import ScrollBox from '@components/atom/ScrollBox';
import Slide from '@components/atom/Slide';
import Typography from '@components/atom/Typography';
import Grid from '@components/atom/Grid';
import Avatar from '@components/atom/Avatar';
import Button from '@components/moleculs/Button';
import Modal from '@mui/material/Modal';
import { ApiService } from '@service/ApiService';
import { useEffect, useState } from 'react';
import { components } from '../../@types/swagger';
import { SymbolExplorerService } from '@service/SymbolExplorerService';
import { PublicAccount } from 'symbol-sdk/dist/src/model/account';

type Props = {
  /** true = open */
  isOpen: boolean;
  onClose?: () => void;
  quest?: components['schemas']['Quest'];
};

/**
 * Display quest details when clicked in the quest list
 */
export default function QuestDetails(props: Props): JSX.Element {
  const [requester, setRequester] = useState<
    components['schemas']['UserTable'] | null
  >(null);

  const getRequesterExplorerUrl = (publicKey?: string): string => {
    const type = Number(import.meta.env.VITE_NETWORK_TYPE);
    if (publicKey && type.toString() !== "NaN") {
      const account = PublicAccount.createFromPublicKey(publicKey, type);
      return SymbolExplorerService.getUrlForAccount(account.address.plain(), type);
    } else {
      return import.meta.env.VITE_SYMBOL_MAINNET_EXPLORER_URL;
    }
  };

  const onClickModalCloseRequest = () => {
    if (props.onClose) props.onClose();
  };

  const onClickReceiveRequest = () => {

    if (props.onClose) props.onClose();
  }

  useEffect(() => {
    let mounted = true;
    if (props.isOpen && props.quest?.requester_public_key) {
      ApiService.getUser({ public_key: props.quest.requester_public_key })
        .then((e) => {
          if (e.data && mounted) {
            console.log(e.data);
            setRequester({ ...e.data });
          }
        })
        .catch((err) => {
          if (err instanceof Error) {
            alert(err.message);
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, [props.isOpen]);

  return (
    <Modal
      open={props.isOpen}
      onClose={props.onClose}
      aria-labelledby='quest-detail-modal'
      aria-describedby='showing-quest-details'
      closeAfterTransition
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <Slide direction='down' in={props.isOpen} mountOnEnter unmountOnExit>
        <Box
          sx={(theme) => ({
            width: '70vw',
            height: '90vh',
            bgcolor: 'background.paper',
            border: `2px solid ${theme.palette.primary.contrastText}`,
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[24],
            p: 4,
          })}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'stretch',
              height: '100%',
            }}
          >
            <Typography
              variant='h5'
              fontWeight='bold'
              textAlign='center'
              gutterBottom
            >
              Quest
            </Typography>
            <Grid
              container
              direction='row'
              spacing={2}
              style={{ marginTop: '1rem', marginBottom: '1rem' }}
            >
              <Grid
                item
                xs={3}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  src={requester?.icon || undefined}
                  style={{ width: '100%', height: 'auto', maxWidth: '100px' }}
                  component={'a'}
                  href={getRequesterExplorerUrl(requester?.public_key)}
                  target='_blank'
                  rel='noopener noreferrer'
                />
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant='h6'
                  fontWeight='bold'
                  textAlign='left'
                  gutterBottom
                >
                  {requester?.name}
                </Typography>
                <Typography
                  variant='body2'
                  fontWeight='bold'
                  textAlign='left'
                  gutterBottom
                >
                  {requester?.created &&
                    `Joined ${new Date(
                      requester?.created * 1000,
                    ).toLocaleDateString()} 〜`}
                </Typography>
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
            <Typography
              variant='h5'
              fontWeight='bold'
              textAlign='left'
              gutterBottom
            >
              {props.quest?.title}
            </Typography>
            <ScrollBox
              style={{
                flexGrow: 1,
                marginTop: '1em',
                marginBottom: '1em',
                gap: '30px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant='body1' textAlign='left'>
                {props.quest?.description.repeat(100)}
              </Typography>
              <Typography variant='h5' textAlign='right' fontWeight='bold'>
                Reward {props.quest?.reward.toLocaleString()} xym
              </Typography>
              <div style={{ height: '3rem' }} />
            </ScrollBox>
            <Grid container direction='row' spacing={3}>
              <Grid item xs={6}>
                <Button
                  fullwidth
                  color={'secondary'}
                  onClick={() => onClickModalCloseRequest()}
                >
                  閉じる
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullwidth
                  color={'primary'}
                  onClick={() => onClickModalCloseRequest()}
                >
                  受ける
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Slide>
    </Modal>
  );
}
