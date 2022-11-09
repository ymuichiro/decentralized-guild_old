import Typography from '@components/atom/Typography';
import { Mosaic } from 'symbol-sdk';

export interface MosaicBoxProps {
  size: 'normal' | '2x';
  ticker: 'XYM' | 'WPT' | 'GPT';
  divisibility?: number;
  mosaic?: Mosaic;
}

const MosaicBox = ({
  size,
  ticker,
  divisibility,
  mosaic,
}: MosaicBoxProps): JSX.Element => {
  const fontSize = size === '2x' ? 20 : 16;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        gap: 4,
        marginTop: 12,
      }}
    >
      <Typography fontSize={fontSize}>1,000,000</Typography>
      {divisibility && (
        <Typography color='#888' fontSize={fontSize - 6}>
          .000000
        </Typography>
      )}
      <Typography fontSize={fontSize}>{ticker}</Typography>
    </div>
  );
};

export default MosaicBox;
