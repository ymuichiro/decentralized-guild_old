import Card from '@components/atom/Card';
import Container from '@components/atom/Container';
import Grid from '@components/atom/Grid';
import Button from '@components/moleculs/Button';
import NotificationsCard from '@components/moleculs/NotificationsCard';
import ProfileCard from '@components/moleculs/ProfileCard';
import { CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Fragment, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTER_PATHS } from '../../Root';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '@store/user/UserAtom';

/**
 * ユーザーのマイページ
 */
export default function Dashboard(): JSX.Element {
  const theme = useTheme();
  const navigate = useNavigate();
  const rUser = useRecoilValue(userInformationState);

  useEffect(() => {
    if (!rUser) {
      alert("正しいユーザー情報を取得できませんでした。再度ログインして下さい");
      navigate(ROUTER_PATHS.top.path);
    }
  }, []);

  if (!rUser) {
    return <div />
  }

  return (
    <>
      <Container maxWidth={"xl"}>
        <Grid container direction='row' spacing={3} style={{
          height: '90vh',
          width: "95vw",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50 %, -50 %)",
          WebkitTransform: "translate(-50%, -50%)",
          msTransform: "translate(-50%, -50%)",
        }}>
          <Grid item xs={4} style={{ height: '100%' }}>
            <div
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ marginBottom: theme.spacing(2) }}>
                <ProfileCard user={rUser} />
              </div>
              <NotificationsCard user={rUser} />
            </div>
          </Grid>
          <Grid item xs={8} style={{ height: '100%' }}>
            <Card style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "stretch" }}>
              <CardContent style={{ paddingBottom: 0 }}>
                <Typography variant="h6" fontWeight="bold" textAlign={"left"}>
                  Dashboard
                </Typography>
              </CardContent>
              <CardContent style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "stretch", gap: "20px" }}>
                <Grid container spacing={2}>
                  <Grid item xs={8}>
                    <Card sx={(theme) => ({ backgroundColor: theme.palette.grey["900"] })}>
                      <CardContent>
                        <Grid container direction="row" spacing={1} style={{ width: "100%" }}>
                          <Grid item xs={12}>
                            <Typography variant="body1" fontWeight="bold" textAlign="left">
                              Guild Statstics
                            </Typography>
                          </Grid>
                          {
                            [
                              { key: "Guild Ranking", value: "1 / 102391284" },
                              { key: "Guild Member", value: "100" },
                              { key: "Guild GDP", value: "100 / week" },
                              { key: "Guild WRP", value: "100,000" },
                            ].map((item, index) => <Fragment key={index}>
                              <Grid item xs={6} >
                                <Typography variant="body2" textAlign="left">
                                  {item.key}
                                </Typography>
                              </Grid>
                              <Grid item xs={6} >
                                <Typography variant="body2" textAlign="left">
                                  {item.value}
                                </Typography>
                              </Grid>
                            </Fragment>)
                          }
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4} style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%", gap: "30px" }}>
                    {[
                      { title: 'Guild Management', path: ROUTER_PATHS.top.path },
                      { title: 'Create a New Job', path: ROUTER_PATHS.questRequest.path },
                      { title: 'New Job from Board', path: ROUTER_PATHS.quests.path },
                    ].map((buttonItem, index) => (
                      <Button key={index} style={{ width: "100%" }} onClick={() => navigate(buttonItem.path)}>
                        {buttonItem.title}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
                <Grid container spacing={2} style={{ height: "100%" }}>
                  <Grid item xs={8} >
                    <Card sx={(theme) => ({ backgroundColor: theme.palette.grey["900"], height: "100%" })}>
                      <CardContent>
                        <Grid container direction="row" spacing={3}>
                          <Grid item xs={12}>
                            <Typography variant="body1" fontWeight="bold" textAlign="left">
                              Guild Works
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Card sx={(theme) => ({ backgroundColor: theme.palette.grey["900"], height: "100%" })}>
                      <CardContent>
                        <Typography variant="body1" fontWeight="bold" textAlign="left">
                          Guild Transaction History
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
