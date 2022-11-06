import styled from '@emotion/styled';

const ScrollBox = styled('div')(({ theme }) => {
  return {
    overflowY: 'scroll',
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  };
});

export default ScrollBox;
