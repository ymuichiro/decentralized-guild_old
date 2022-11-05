import { components } from '../../@types/swagger';
import Card from '@components/atom/Card';
import CardActions from '@components/atom/CardActions';
import CardContent from '@components/atom/CardContent';
import Typography from '@components/atom/Typography';
import Button from '@components/moleculs/Button';

interface Props extends Partial<components['schemas']['Quest']> {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  containerStyle?: React.CSSProperties;
}

/**
 * A quest card that is displayed in the quest list.
 */
export default function QuestCard(props: Props): JSX.Element {

  console.log(props);

  return (
    <Card
      sx={(theme) => ({
        ...props.containerStyle,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'stretch',
        backgroundColor: theme.palette.grey['100'],
        color: '#000',
      })}
    >
      <CardContent style={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant='h6'
          component='div'
          fontWeight='bold'
          whiteSpace='nowrap'
          textOverflow='ellipsis'
          overflow='hidden'
        >
          {props.title}
        </Typography>
        <Typography
          variant='body2'
          style={{ minHeight: '150px' }}
        >
          {props.description && props.description?.length > 100
            ? props.description?.slice(0, 100) + '...'
            : props.description?.slice(0, 100)}
        </Typography>
      </CardContent>
      <CardContent style={{ paddingTop: '0px', paddingBottom: '0px' }}>
        <Typography
          gutterBottom
          variant='body1'
          component='div'
          fontWeight='bold'
          whiteSpace='nowrap'
          overflow='hidden'
          textAlign={'right'}
        >
          {props.reward?.toLocaleString()} xym
        </Typography>
      </CardContent>
      <CardActions style={{ justifyContent: 'center', padding: 0 }}>
        <Button
          size='small'
          fullwidth
          onClick={props.onClick}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        >
          詳細を確認する
        </Button>
      </CardActions>
    </Card>
  );
}
