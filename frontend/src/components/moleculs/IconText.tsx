import { CSSProperties, ReactElement } from 'react';

export interface IconTextProps {
  icon: ReactElement;
  content: string;
  style: CSSProperties;
}

const IconText = ({ icon, content, style }: IconTextProps): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 4,
      }}
    >
      {icon}
      <p style={{ ...style }}>{content}</p>
    </div>
  );
};

export default IconText;
