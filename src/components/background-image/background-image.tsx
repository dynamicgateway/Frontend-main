import React from 'react';

interface BackgroundImageProps {
  imageSrc: string;
  children?: React.ReactNode;
}

export const BackgroundImage: React.FC<BackgroundImageProps> = ({ imageSrc, children }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: 'initial',
        backgroundRepeat: 'repeat-x',
        backgroundPositionY: '85%',
        backgroundAttachment: 'fixed',
        zIndex: -1,
      }}
    />
  );
};
