import type { ReactNode } from 'react';

interface TextAndIconProps {
  icon: ReactNode;
  title: string;
  subTitle?: string;
  titleAction?: ReactNode;
}

const TextAndIcon = ({ icon, title, subTitle, titleAction }: TextAndIconProps) => {
  return (
    <div className="flex items-center gap-2 align-middle">
      <div className="flex items-center justify-center">{icon}</div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{title}</div>
          {titleAction && <div>{titleAction}</div>}
        </div>
        {subTitle && <div className="text-xs text-gray-500">{subTitle}</div>}
      </div>
    </div>
  );
};

export default TextAndIcon;
