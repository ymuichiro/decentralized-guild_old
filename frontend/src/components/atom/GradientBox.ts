import styled from '@emotion/styled';

const GradientBox = styled('div')(({ theme }) => {
  return {
    border: '6px solid',
    borderImage: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.secondary.main}) 1`,
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
});

export default GradientBox;
