import type { FC } from 'react';
import { StarRating } from '@/components/star-rating';

export const HomePage: FC = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <StarRating />
    </div>
  );
};
