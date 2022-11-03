import ButtonBase from '../atom/ButtonBase';
import styled from '@emotion/styled';

type Props = {
  color?: 'primary' | 'secondary' | 'disabled';
  size?: 'small' | '2x';
};

const Button = styled(ButtonBase)<Props>(({ theme, color, size }) => {
  let paddings = { horizontal: 4, vertical: 1 };
  let fontSize = 14;

  if (size === 'small') {
    paddings = { horizontal: 4, vertical: 1 };
  } else if (size === '2x') {
    paddings = { horizontal: 8, vertical: 2 };
    fontSize = 18;
  }

  let background = `linear-gradient(270deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`;
  if (color === 'disabled') {
    background = theme.palette.grey[700];
  } else if (color === 'secondary') {
    background = theme.palette.secondary.main;
  }

  return {
    background: background,
    color: theme.palette.primary.contrastText,
    paddingLeft: theme.spacing(paddings.horizontal),
    paddingRight: theme.spacing(paddings.horizontal),
    paddingTop: theme.spacing(paddings.vertical),
    paddingBottom: theme.spacing(paddings.vertical),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    fontWeight: 'bold',
    fontSize: fontSize,
    transition: 'all 1s ease',
    '&:hover': {
      opacity: 0.7,
    },
  };
});

export default Button;
