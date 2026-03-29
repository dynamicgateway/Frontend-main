import React, { useState } from 'react';
import { Button } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { FormControl, Select, MenuItem, Autocomplete, TextField } from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

interface Authority {
  id: string;
  name: string;
  nameHe: string;
}

const authorities: Authority[] = [
  { id: '1', name: 'Menashe Regional Council', nameHe: 'מועצה אזורית מנשה' },
  { id: '2', name: 'Tel Aviv Municipality', nameHe: 'עיריית תל אביב' },
  { id: '3', name: 'Jerusalem Municipality', nameHe: 'עיריית ירושלים' },
  { id: '4', name: 'Haifa Municipality', nameHe: 'עיריית חיפה' },
];

export const AuthoritySelection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [selectedAuthority, setSelectedAuthority] = useState<string>('1');
  const isHebrew = i18n.language === 'he';

  const handleTakeMeToAuthority = () => {
    // Handle navigation to selected authority
    console.log('Selected authority:', selectedAuthority);
  };

  const getSelectedAuthorityName = () => {
    const authority = authorities.find((auth) => auth.id === selectedAuthority);
    return authority ? (isHebrew ? authority.nameHe : authority.name) : '';
  };

  return (
    <div className="flex h-full w-full flex-col items-center p-4 pt-[15%]" dir="rtl">
      <div className="w-3/4 max-w-3xl text-center">
        <div className="mb-9">
          {/* Welcome Text */}
          <div className="mb-2">
            <CustomTypography type="hThree" style={{ color: colors.primaryBlue }}>
              {t('authoritySelection.welcomeTitle')}
            </CustomTypography>
          </div>

          <div className="mb-4 px-4">
            {/* Description Text */}
            <CustomTypography type="textSecondaryOne" style={{ color: colors.darkGrey }}>
              {t('authoritySelection.description')}
            </CustomTypography>
          </div>
        </div>
        {/* Interactive Elements Container */}
        <div className="mt-2 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Authority Selection Dropdown */}
          <FormControl sx={{ width: { xs: '100%', sm: 'auto' } }}>
            <Autocomplete
              value={authorities.find((authority) => authority.id === selectedAuthority) || null}
              onChange={(event, newValue) => {
                setSelectedAuthority(newValue ? newValue.id : '');
              }}
              options={authorities}
              getOptionLabel={(option) => option.nameHe}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              popupIcon={<KeyboardArrowDown />}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderColor: colors.primaryBlue,
                      backgroundColor: colors.white,
                      color: colors.primaryBlue,
                      width: { xs: '100%', sm: '430px' }, // Responsive width
                      height: '50px',
                      borderRadius: '100px',
                      borderWidth: '2.5px',
                      minWidth: '220px',
                      border: `2.5px solid ${colors.primaryBlue}`,
                      '& fieldset': {
                        border: 'none',
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
                        paddingLeft: '20px',
                        paddingRight: '0px',
                        textAlign: isHebrew ? 'right' : 'left',
                        fontFamily: 'system-ui, sans-serif',
                        fontWeight: 500,
                      },
                    },
                    // Override specific RTL class combination - multiple approaches
                    '&.MuiAutocomplete-hasPopupIcon.MuiAutocomplete-hasClearIcon[class*="mui-rtl"] .MuiOutlinedInput-root':
                      {
                        paddingRight: '20px !important',
                      },
                    '&[class*="mui-rtl"] .MuiOutlinedInput-root': {
                      paddingRight: '20px !important',
                    },
                    '&.MuiAutocomplete-hasPopupIcon[class*="mui-rtl"] .MuiOutlinedInput-root': {
                      paddingRight: '20px !important',
                    },
                    '&.MuiAutocomplete-hasClearIcon[class*="mui-rtl"] .MuiOutlinedInput-root': {
                      paddingRight: '20px !important',
                    },
                    '& .MuiAutocomplete-endAdornment': {
                      right: 0,
                    },
                  }}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  {option.nameHe}
                </li>
              )}
            />
          </FormControl>

          {/* Take Me Button */}
          <Button
            variant="contained"
            onClick={handleTakeMeToAuthority}
            className="flex h-[48px] gap-2 px-4"
            sx={{
              borderRadius: '100px',
              bgcolor: colors.secondaryBlue,
              '&:hover': {
                bgcolor: colors.secondaryDarkBlue,
              },
              width: { xs: '100%', sm: '190px' }, // Responsive width
              px: 1.5,
              py: 1.5,
              color: colors.white,
              transition: 'background-color 0.2s',
            }}
            endIcon={
              <ArrowBack
                sx={{
                  // transform: 'scaleX(-1)',
                  fontSize: '20px',
                  color: colors.white,
                }}
              />
            }
          >
            <div className="w-full">
              <CustomTypography type="textThird" style={{}}>
                {t('authoritySelection.takeMeToAuthority')}
              </CustomTypography>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
