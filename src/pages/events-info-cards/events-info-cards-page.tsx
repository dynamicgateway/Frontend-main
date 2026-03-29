import React, { useState } from 'react';

import EventSubjectCard from '@/components/event-subject-card';
import { CustomTypography } from '@/components/custom-typography';
import { TextField, Select, MenuItem, FormControl } from '@mui/material';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { DownArrowHeadIcon, SearchGreyIcon, SearchIcon } from '@/assets';
import { twMerge } from 'tailwind-merge';
import EventsInfoPageImage from '@/assets/images/events-info.png';

export const EventsInfoCardsPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    console.log('Search:', { searchQuery });
    // Add your search logic here
  };

  const eventCardsData = [
    {
      id: 1,
      title: 'קורסים והרצאות',
      subtitle: 'אירועים, הרצאות והופעות המועצה. הכל במקום אחד',
      buttonText: 'לכל האירועים',
      imageUrl: undefined, // You can add image URLs here
    },
    {
      id: 2,
      title: 'אירועים',
      subtitle: 'אירועים, הרצאות והופעות המועצה. הכל במקום אחד',
      buttonText: 'לכל האירועים',
      imageUrl: undefined, // You can add image URLs here
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - White Background */}
      <div className="flex gap-2 bg-white px-47 py-12">
        <div className="mr-4">
          <img src={EventsInfoPageImage} alt="Events Page Icon" />
        </div>
        <div className="mx-auto w-[80%] max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Left side - Text content */}
            <div className="flex-1 pr-8">
              <div className="mb-9">
                <CustomTypography type="hOne" style={{ color: colors.primaryBlue }} className="mb-6 text-right">
                  {t('eventsInfoCardsPage.mainTitle')}
                </CustomTypography>
              </div>
              <div className="">
                <CustomTypography
                  type="textThirdThin"
                  style={{ color: colors.darkGrey, letterSpacing: '1px', lineHeight: '32px' }}
                  className="text-right leading-relaxed"
                >
                  {t('eventsInfoCardsPage.description')}
                </CustomTypography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section - Light Blue Background */}
      <div className="px-5 py-8 md:px-65" style={{ backgroundColor: colors.thirdLightBlue }}>
        <div className="mx-auto max-w-7xl">
          <div className={twMerge('flex flex-wrap items-end justify-between', 'space-x-6 rtl:space-x-reverse')}>
            {/* Free Search Input */}
            <div className="mx-0 w-full">
              <TextField
                className="w-full"
                placeholder={t('eventsInfoCardsPage.search.freeSearchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 72,
                    // height: 56,
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    boxShadow: '0px 16px 16px 0px #027DB333',

                    '&:hover fieldset': {
                      borderColor: '#93c5fd',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#93c5fd',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    color: colors.primaryBlue,
                    '&.Mui-focused': {
                      color: colors.primaryBlue,
                    },
                  },
                  '& .MuiInputBase-input::placeholder': {
                    color: 'black !important',
                    fontSize: '18px',
                    fontFamily: 'Rubik, sans-serif',
                    fontWeight: 400,
                    paddingRight: '12px',
                    paddingLeft: '12px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <div className="mx-6">
                      <SearchGreyIcon color={colors.primaryBlue} />
                    </div>
                  ),
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Event Cards Section */}
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Event Cards Grid */}
          <div className="flex flex-wrap justify-center gap-8">
            {eventCardsData.map((card) => (
              <EventSubjectCard
                key={card.id}
                title={card.title}
                subtitle={card.subtitle}
                buttonText={card.buttonText}
                imageUrl={card.imageUrl}
                onButtonClick={() => console.log('card clicked')}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsInfoCardsPage;
