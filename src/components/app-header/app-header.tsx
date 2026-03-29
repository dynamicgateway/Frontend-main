import { type FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as PATHS from '@/constants/router-paths-constants';
import { ZIndexLevelsEnum } from '@/constants/ui-constants';
import { twJoin } from 'tailwind-merge';
import { Menu, MenuItem } from '@mui/material';
import { CustomTypography } from '@/components/custom-typography';
import { Main1Icon, UserIcon, NotificationBellIcon, TopArrowHeadIcon, DownArrowHeadIcon } from '@/assets';
import { t } from 'i18next';
import { selectUserData, clearUserRole } from '@/store/slices/user-data';
import { useSelector } from 'react-redux';
import SwitchComponent from '../swich';
import { colors } from '@/theme/colors';
import { signOut } from 'aws-amplify/auth';
import { useAppDispatch } from '@/store/store';
import { selectLanguage, AppLanguage } from '@/store/slices/system';
import { switchToHebrew, switchToEnglish } from '@/utils/language-utils';
import { UserDataRole } from '@/types/user-data';
// API usage removed per request; keeping APIs in src/apis

export const AppHeader: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userRole = useSelector(selectUserData);
  const language = useSelector(selectLanguage);
  console.log(userRole, 'userRole');

  // State for UsersCopyIcon menu
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  // State for switch component
  const [switchValue, setSwitchValue] = useState<boolean>(false);

  // const { data: profileData } = useGetProfileQuery();
  // const [updateResume] = useUpdateResumeMutation();
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  // useEffect(() => {
  //   if (profileData) {
  //     setSwitchValue(profileData.actively_looking === true ? true : false);
  //   }
  // }, [profileData]);

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = async () => {
    await signOut();
    dispatch(clearUserRole());
    navigate('/');
  };
  const handleSwitchToHebrew = () => switchToHebrew(dispatch);
  const handleSwitchToEnglish = () => switchToEnglish(dispatch);
  // Function to handle switch press
  const onSwitchPressed = (newValue: boolean) => {
    setSwitchValue(newValue);
    // updateResume({ actively_looking: newValue });
  };

  // const handleMainIconClick = () => {
  //   if (userRole.role === UserDataRole.JOB_SEEKER) {
  //     navigate(PATHS.JOB_SEEKERS_PROFILE);
  //   } else {
  //     navigate(PATHS.EMPLOYERS_PROFILE);
  //   }
  // };

  return (
    <div
      className={twJoin('top-0 left-0 z-0 flex w-full items-center justify-between bg-white px-20 shadow')}
      style={{ zIndex: ZIndexLevelsEnum.APP_HEADER, height: '120px' }}
    >
      <div className="flex flex-row items-end gap-2">
        <button onClick={() => {}} className="cursor-pointer">
          <div className="flex flex-row items-center gap-2">
            <div className="cursor-pointer" onClick={() => {}}>
              <Main1Icon />
            </div>
          </div>
        </button>
        <div className="flex flex-row items-center gap-2">
          <CustomTypography type="textPrimaryOne">{t('common.title')}</CustomTypography>
          <CustomTypography type="textPrimaryOne">{t('common.version')}</CustomTypography>
        </div>
      </div>

      <div className={twJoin('flex flex-row gap-3')}>
        {/* Language buttons - always visible */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSwitchToHebrew}
            className={twJoin(
              'rounded border px-2 py-1 text-xs',
              language === AppLanguage.HE ? 'bg-black text-white' : 'bg-white text-black'
            )}
          >
            HEB
          </button>
          <button
            onClick={handleSwitchToEnglish}
            className={twJoin(
              'rounded border px-2 py-1 text-xs',
              language === AppLanguage.EN ? 'bg-black text-white' : 'bg-white text-black'
            )}
          >
            ENG
          </button>
        </div>

        {userRole.role !== null && (
          <>
            <div className="flex flex-row items-center gap-2">
              <SwitchComponent
                checked={switchValue}
                onClick={() => {
                  onSwitchPressed(!switchValue);
                }}
                customColor={colors.black}
              />
            </div>

            <div>
              <CustomTypography type="textPrimaryOne" style={{ color: colors.black }}>
                {t('navnar.toggleText')}
              </CustomTypography>
            </div>

            <div className="cursor-pointer">
              <NotificationBellIcon />
            </div>

            <div className="flex gap-1" onClick={handleUserMenuOpen} style={{ cursor: 'pointer' }}>
              <UserIcon />

              <CustomTypography type="textPrimaryOne">
                {t('appHeader.heyUser', { name: t('appHeader.user') })}
              </CustomTypography>
              {userMenuAnchor ? <TopArrowHeadIcon /> : <DownArrowHeadIcon />}
            </div>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={handleLogout}>{t('common.logout')}</MenuItem>
            </Menu>
          </>
        )}
      </div>
    </div>
  );
};
