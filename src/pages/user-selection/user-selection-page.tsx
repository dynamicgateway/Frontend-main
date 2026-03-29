import React from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { useTranslation } from 'react-i18next';
import ExistingUser from '@/assets/images/existingUser.png';
import NewUser from '@/assets/images/newUser.png';
import { colors } from '@/theme/colors';
import styles from './user-selection-page.module.css';
import * as PATHS from '@/constants/router-paths-constants';
import { useNavigate } from 'react-router-dom';
import { selectIsMobile } from '@/store/slices/system';
import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';

const UserSelection: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useSelector(selectIsMobile);
  const navigate = useNavigate();
  return (
    <div className={twMerge(styles.mainContainer, 'bg-transparent')}>
      {/* Title */}
      <div className={isMobile ? styles.titleColumn : styles.titleRow}>
        <CustomTypography type={isMobile ? 'hMobileOne' : 'hOne'} style={{}}>
          {t('userSelection.welcome')}
        </CustomTypography>
        <div className="">
          <CustomTypography
            type={isMobile ? 'hMobileOne' : 'hOne'}
            className=""
            style={{
              color: colors.secondaryBlue,
            }}
          >
            {t('userSelection.metBefore')}
          </CustomTypography>
          <CustomTypography type={isMobile ? 'hMobileOne' : 'hOne'} className="" style={{}}>
            ?
          </CustomTypography>
        </div>
      </div>
      {/* Subtitle */}
      <CustomTypography type="textSecondaryOne" className={styles.subtitle} style={{ color: colors.black }}>
        {t('userSelection.subtitle')}
      </CustomTypography>
      {/* Cards */}
      <div className={styles.cardsContainer} style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Card 1: new user */}
        <div className={styles.card}>
          <img
            src={NewUser}
            alt={t('userSelection.newUser')}
            className={isMobile ? styles.cardImageMobile : styles.cardImage}
          />

          <button className={`${styles.button} `} onClick={() => navigate(`${PATHS.USER_SELECTION}`)}>
            {t('userSelection.newUser')}
            <span style={{ fontSize: 20, marginLeft: 8 }}>{t('userSelection.arrow')}</span>
          </button>
        </div>
        {/* Card 2: exsiting user */}
        <div className={styles.card}>
          <img
            src={ExistingUser}
            alt={t('userSelection.existingUser')}
            className={isMobile ? styles.cardImageMobile : styles.cardImage}
          />

          <button className={`${styles.button} ${styles.buttonBlue}`} onClick={() => navigate(`${PATHS.LOGIN}`)}>
            <CustomTypography type="button">{t('userSelection.existingUser')}</CustomTypography>
            <span style={{ fontSize: 20, marginLeft: 8 }}>{t('userSelection.arrow')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserSelection;
