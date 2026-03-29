import { useMemo, useState, type FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/store';
import { useSelector } from 'react-redux';
import { twJoin, twMerge } from 'tailwind-merge';
import { useTranslation } from 'react-i18next';
import { getNavItems } from '@/utils/auth-utils';
import { ROUTES } from '@/routes/routes';
import type { Route } from '@/types/infra';
import { selectUserRole, clearUserRole } from '@/store/slices/user-data';
import { LogoutIcon, PivotersIcon } from '@/assets';
import { signOut } from 'aws-amplify/auth';
import SwitchComponent from '../swich';
import { CustomTypography } from '../custom-typography';
import { colors } from '@/theme/colors';
import Tooltip from '@mui/material/Tooltip';
import { selectIsMobile } from '@/store/slices/system';

const VerticalNavbar: FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const userRole = useSelector(selectUserRole);
  const [routes, setRoutes] = useState<Array<Route>>([]);
  const [isActivelyLooking, setIsActivelyLooking] = useState(false);
  const isMobile = useSelector(selectIsMobile);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useMemo(() => {
    const filteredRoutes = getNavItems(ROUTES, userRole).filter((route) => route.displayInNavbar);
    setRoutes(filteredRoutes as Array<Route>);
  }, [userRole]);

  const handleLogout = async () => {
    await signOut();
    dispatch(clearUserRole());
    navigate('/');
  };

  // Hamburger icon for mobile
  const Hamburger = (
    <button
      className="fixed top-0 left-2 z-50 rounded bg-white p-2"
      onClick={() => setIsMobileNavOpen(true)}
      aria-label="Open navigation"
    >
      <span style={{ fontSize: 32 }}>☰</span>
    </button>
  );

  // Close icon for mobile nav
  const CloseButton = (
    <button
      className="absolute top-2 right-2 z-50 rounded p-2 shadow"
      onClick={() => setIsMobileNavOpen(false)}
      aria-label="Close navigation"
    >
      <span style={{ fontSize: 32 }}>×</span>
    </button>
  );

  // Navbar content (put your existing content here)
  const NavbarContent = (
    <>
      {isMobile && (
        <div className="flex w-full items-center justify-center gap-1 p-4">
          <PivotersIcon />
          <CustomTypography type="hThree" style={{ color: colors.primaryBlue, fontWeight: 600 }}>
            {t('common.title')}
          </CustomTypography>
        </div>
      )}

      <div className="flex h-full flex-col">
        <hr className="border-gray-100" />
        <div className={'mt-3 flex w-full gap-4 p-4'}>
          <SwitchComponent
            value={isActivelyLooking}
            onChange={() => setIsActivelyLooking((prev) => !prev)}
            customColor={colors.primaryBlue}
          />
          <Tooltip title={t('navBar.switchTooltip')}>
            <CustomTypography type="textSecondaryOne" style={{ color: colors.primaryBlue }}>
              {t('navBar.activelyLookingForJob')}
            </CustomTypography>
          </Tooltip>
        </div>
        <hr className="border-gray-100" />
        <div className="flex h-full flex-col justify-between">
          <div>
            <nav className="mt-3 flex w-full flex-col space-y-4">
              {routes.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      twMerge(
                        'mb-0 rounded-md p-4 transition-colors duration-200 hover:bg-gray-700',
                        isActive ? 'bg-[#5B1F3F]' : ''
                      )
                    }
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className={twJoin('flex w-full items-center gap-3')}>
                        <Icon />
                        <span className={twJoin('text-[18px]')}>{t(item.label)}</span>
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </nav>
          </div>

          <button className="mb-0 cursor-pointer rounded-md p-4 transition-colors duration-200">
            <div onClick={handleLogout} className="flex w-full items-center justify-between">
              <div className={twJoin('flex w-full items-center gap-3')}>
                <LogoutIcon />
                <span className={twJoin('text-[18px]')}>{t('common.logout')}</span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger icon for mobile when nav is closed */}
      {isMobile && !isMobileNavOpen && Hamburger}

      {/* Navbar container */}
      {(!isMobile || isMobileNavOpen) && (
        <div
          className={twMerge(
            `top-0 left-0 z-40 h-full w-[20vw] max-w-[280px] bg-white shadow-lg transition-transform duration-300`,
            isMobile && !isMobileNavOpen ? '-translate-x-full' : 'translate-x-0',
            isMobile && 'fixed w-[80vw]'
          )}
          style={{
            borderColor: colors.lightGrey,
            borderWidth: '0.1px',
            borderStyle: 'solid',
          }}
        >
          {/* Close button for mobile */}
          {isMobile && CloseButton}
          {/* Navbar content */}
          {NavbarContent}
        </div>
      )}
    </>
  );
};

export default VerticalNavbar;
