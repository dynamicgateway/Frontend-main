import React, { useState } from 'react';
import ActivityCard from '@/components/activity-card';
import { CustomTypography } from '@/components/custom-typography';
import { TextField, Button, FormControl, InputLabel, Autocomplete, Select, MenuItem } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { ClassPageIcon, DownArrowHeadIcon, SearchGreyIcon, SearchIcon } from '@/assets';
import { twMerge } from 'tailwind-merge';
import ClassPageImage from '@/assets/images/class-page.png';
export const ClassesPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedField, setSelectedField] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const isHebrew = i18n.language === 'he';

  const handleRegisterClick = () => {
    console.log('Registration clicked!');
    // Add your registration logic here
  };

  const handleSearch = () => {
    console.log('Search:', { searchQuery, selectedField, selectedClass });
    // Add your search logic here
  };

  const activityFields = [
    { value: 'sport', label: 'ספורט' },
    { value: 'music', label: 'מוזיקה' },
    { value: 'art', label: 'אמנות' },
    { value: 'science', label: 'מדע' },
    { value: 'dance', label: 'ריקוד' },
    { value: 'technology', label: 'טכנולוגיה' },
  ];

  const classTypes = [
    { value: 'football', label: 'כדורגל' },
    { value: 'swimming', label: 'שחייה' },
    { value: 'guitar', label: 'גיטרה' },
    { value: 'painting', label: 'ציור' },
    { value: 'dance', label: 'ריקוד מודרני' },
    { value: 'science', label: 'מדעים לילדים' },
  ];

  const activityData = [
    {
      id: 1,
      category: 'ספורט',
      title: "חוג בי'ס כדורגל פעמיים בשבוע",
      groupInfo: 'קבוצה - עברון ג ומעלה בנים',
      schedule: "ימים ג' 16:30, ו' 13:00",
      instructor: 'הדרכה אסי בן אברהם',
      location: 'עברון',
    },
    {
      id: 2,
      category: 'מוזיקה',
      title: 'חוג גיטרה למתחילים',
      groupInfo: 'קבוצה - בני 10-16',
      schedule: "ימים א' 16:00, ד' 16:00",
      instructor: 'הדרכה דוד לוי',
      location: 'ירושלים',
    },
    {
      id: 3,
      category: 'אמנות',
      title: 'חוג ציור ורישום',
      groupInfo: 'קבוצה - כל הגילאים',
      schedule: "ימים ב' 17:00, ה' 17:00",
      instructor: 'הדרכה שרה כהן',
      location: 'תל אביב',
    },
    {
      id: 4,
      category: 'ספורט',
      title: 'חוג שחייה למתחילים',
      groupInfo: 'קבוצה - בני 6-12',
      schedule: "ימים א' 15:00, ג' 15:00",
      instructor: 'הדרכה מיכאל רוזן',
      location: 'חיפה',
    },
    {
      id: 5,
      category: 'ריקוד',
      title: 'חוג ריקוד מודרני',
      groupInfo: 'קבוצה - בני 8-15',
      schedule: "ימים ב' 16:30, ה' 16:30",
      instructor: 'הדרכה נועה כהן',
      location: 'באר שבע',
    },
    {
      id: 6,
      category: 'מדע',
      title: 'חוג מדעים לילדים',
      groupInfo: 'קבוצה - בני 7-11',
      schedule: "ימים ג' 17:30, ו' 10:00",
      instructor: 'הדרכה ד״ר יוסי שפירא',
      location: 'אשדוד',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Section - White Background */}
      <div className="flex gap-2 bg-white px-47 py-12">
        <div className="mr-4">
          <img src={ClassPageImage} alt="Class Page Icon" />
        </div>
        <div className="mx-auto w-[80%] max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Left side - Text content */}
            <div className="flex-1 pr-8">
              <div className="mb-9">
                <CustomTypography type="hOne" style={{ color: colors.primaryBlue }} className="mb-6 text-right">
                  {t('classesPage.mainTitle')}
                </CustomTypography>
              </div>
              <div className="">
                <CustomTypography
                  type="textThirdThin"
                  style={{ color: colors.darkGrey, letterSpacing: '1px' }}
                  className="text-right leading-relaxed"
                >
                  {t('classesPage.description')}
                </CustomTypography>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section - Light Blue Background */}
      <div className="px-4 py-8" style={{ backgroundColor: colors.primaryLightBlue }}>
        <div className="mx-auto max-w-7xl">
          <div className={twMerge('flex flex-wrap items-end justify-between', 'space-x-6 rtl:space-x-reverse')}>
            {/* Free Search Input */}
            <div className="mx-0">
              <div className="px-7">
                <CustomTypography type="textFifth" style={{ color: colors.darkGrey }}>
                  {t('classesPage.search.freeSearch')}
                </CustomTypography>
              </div>
              <TextField
                placeholder={t('classesPage.search.freeSearchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  width: 391,
                  height: 62,
                  '& .MuiOutlinedInput-root': {
                    height: 56,
                    borderRadius: '50px',
                    border: `1px solid ${colors.darkGrey}`,
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#d1d5db',
                    },
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
                  '& .MuiInputBase-input': {
                    paddingLeft: '27px',
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <div className="mx-3">
                      <SearchGreyIcon />
                    </div>
                  ),
                }}
              />
            </div>

            {/* Activity Field Dropdown */}
            <FormControl sx={{ height: 86, width: 390 }}>
              <div className="px-7">
                <CustomTypography type="textFifth" style={{ color: colors.darkGrey }}>
                  {t('classesPage.search.activityField')}
                </CustomTypography>
              </div>

              <Autocomplete
                value={activityFields.find((field) => field.value === selectedField) || null}
                onChange={(event, newValue) => {
                  setSelectedField(newValue ? newValue.value : '');
                }}
                options={activityFields}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                popupIcon={<DownArrowHeadIcon />}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('classesPage.search.activityFieldPlaceholder')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: colors.primaryBlue,
                        backgroundColor: colors.white,
                        color: colors.primaryBlue,
                        width: '390px',
                        height: '56px',
                        borderRadius: '100px',
                        minWidth: '220px',
                        border: `1px solid ${colors.disabledGray}`,
                        '& fieldset': {
                          border: 'none',
                        },
                        '& .MuiInputBase-input': {
                          color: colors.darkGrey,
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                        '& .MuiAutocomplete-endAdornment': {
                          right: isHebrew ? 'auto' : '16px',
                          left: isHebrew ? '16px' : 'auto',
                        },
                        '& .MuiAutocomplete-input': {
                          paddingLeft: '16px',
                          paddingRight: '0px',
                          textAlign: isHebrew ? 'right' : 'left',
                          fontFamily: 'system-ui, sans-serif',
                          fontWeight: 500,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: colors.disabledGray,
                          fontSize: '16px',
                          fontFamily: 'system-ui, sans-serif',
                          fontWeight: 400,
                        },
                      },
                      // Target RTL specific classes for padding
                      '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
                        paddingRight: '0px',
                      },
                      '&.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': {
                        paddingRight: '0px',
                      },
                      // Target specific RTL class combination
                      '&.MuiAutocomplete-hasPopupIcon[class*="mui-rtl"] .MuiOutlinedInput-root': {
                        paddingRight: '0px',
                      },
                      // Target specific RTL InputBase class
                      '& .MuiInputBase-root[class*="mui-rtl"]': {
                        paddingRight: '25px',
                        paddingLeft: '25px',
                      },
                      // Target specific RTL InputBase class
                      '& .MuiInputBase-root': {
                        paddingLeft: '10px',
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
            </FormControl>

            {/* Class Selection Dropdown */}
            <FormControl sx={{ height: 86, width: 390 }}>
              <div className="px-7">
                <CustomTypography type="textFifth" style={{ color: colors.darkGrey }}>
                  {t('classesPage.search.classSelection')}
                </CustomTypography>
              </div>

              <Autocomplete
                value={classTypes.find((classType) => classType.value === selectedClass) || null}
                onChange={(event, newValue) => {
                  setSelectedClass(newValue ? newValue.value : '');
                }}
                options={classTypes}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                popupIcon={<DownArrowHeadIcon />}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder={t('classesPage.search.classSelectionPlaceholder')}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderColor: colors.primaryBlue,
                        backgroundColor: colors.white,
                        color: colors.primaryBlue,
                        width: '390px',
                        height: '56px',
                        borderRadius: '100px',
                        minWidth: '220px',
                        border: `1px solid ${colors.disabledGray}`,
                        '& fieldset': {
                          border: 'none',
                        },
                        '& .MuiInputBase-input': {
                          color: colors.darkGrey,
                        },
                        '&:hover fieldset': {
                          border: 'none',
                        },
                        '&.Mui-focused fieldset': {
                          border: 'none',
                        },
                        '& .MuiAutocomplete-endAdornment': {
                          right: isHebrew ? 'auto' : '16px',
                          left: isHebrew ? '16px' : 'auto',
                        },
                        '& .MuiAutocomplete-input': {
                          paddingLeft: '16px',
                          paddingRight: '0px',
                          textAlign: isHebrew ? 'right' : 'left',
                          fontFamily: 'system-ui, sans-serif',
                          fontWeight: 500,
                        },
                        '& .MuiInputBase-input::placeholder': {
                          color: colors.disabledGray,
                          fontSize: '16px',
                          fontFamily: 'system-ui, sans-serif',
                          fontWeight: 400,
                        },
                      },
                      // Target RTL specific classes for padding
                      '&.MuiAutocomplete-hasPopupIcon .MuiOutlinedInput-root': {
                        paddingRight: '0px',
                      },
                      '&.MuiAutocomplete-hasClearIcon .MuiOutlinedInput-root': {
                        paddingRight: '0px',
                      },
                      // Target specific RTL class combination
                      '&.MuiAutocomplete-hasPopupIcon[class*="mui-rtl"] .MuiOutlinedInput-root': {
                        paddingRight: '0px',
                      },
                      // Target specific RTL InputBase class
                      '& .MuiInputBase-root[class*="mui-rtl"]': {
                        paddingRight: '25px',
                        paddingLeft: '25px',
                      },
                      // Target specific RTL InputBase class
                      '& .MuiInputBase-root': {
                        paddingLeft: '10px',
                      },
                    }}
                  />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
              />
            </FormControl>

            {/* Search Button */}
            <button className="pb-2">
              <SearchIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Activity Cards Section */}
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 text-center">
            <CustomTypography type="hThree" style={{ color: colors.primaryBlue }}>
              {t('classesPage.title')}
            </CustomTypography>
          </div>

          {/* Activity Cards Grid */}
          <div className="flex flex-wrap justify-items-center gap-8">
            {activityData.map((activity) => (
              <ActivityCard
                key={activity.id}
                category={activity.category}
                title={activity.title}
                groupInfo={activity.groupInfo}
                schedule={activity.schedule}
                instructor={activity.instructor}
                location={activity.location}
                onRegisterClick={handleRegisterClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
