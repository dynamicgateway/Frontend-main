import React from 'react';
import { CustomTypography } from '@/components/custom-typography';
import { useTranslation } from 'react-i18next';
import CandidatePage from '@/assets/images/candidatePage.png';
import EmployerPage from '@/assets/images/employerPage.png';
import { colors } from '@/theme/colors';
import styles from './LandingPage.module.css';
import { useSelector } from 'react-redux';
import { selectIsMobile } from '@/store/slices/system';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useSelector(selectIsMobile);

  return (
    <div className={styles.mainContainer}>
      {/* Title */}
      <div className={isMobile ? styles.titleColumn : styles.titleRow}>
        <CustomTypography
          type="hOne"
          className="mb-4"
          style={{ fontSize: '3rem', fontWeight: 700, textAlign: 'center', marginBottom: '1rem' }}
        >
          {t('landingPage.findYouPerfect')}
        </CustomTypography>
        <CustomTypography
          type="hOne"
          className="mb-4"
          style={{ fontSize: '3rem', fontWeight: 700, textAlign: 'center', marginBottom: '1rem', color: '#B30CFF' }}
        >
          {t('landingPage.careerMatch')}
        </CustomTypography>
      </div>
      {/* Subtitle */}
      <CustomTypography type="hFour" className={styles.subtitle}>
        {t('landingPage.subtitle')}
      </CustomTypography>
      {/* Cards */}
      <div className={styles.cardsContainer} style={{ flexDirection: isMobile ? 'column' : 'row' }}>
        {/* Card 1: Job Seeker */}
        <div className={styles.card}>
          <img src={CandidatePage} alt={t('landingPage.jobSeekerIconAlt')} className={styles.cardImage} />
          <CustomTypography type="hThree" style={{ marginBottom: 12 }}>
            {t('landingPage.jobSeekerTitle')}
          </CustomTypography>
          <CustomTypography
            type="textSecondaryOne"
            style={{ color: colors.lightGrey, textAlign: 'center', marginBottom: 24 }}
          >
            {t('landingPage.jobSeekerDesc')}
          </CustomTypography>
          <button className={styles.button}>
            {t('landingPage.jobSeekerButtonText')}
            <span style={{ fontSize: 20, marginLeft: 8 }}>{t('landingPage.arrow')}</span>
          </button>
        </div>
        {/* Card 2: Employer */}
        <div className={styles.card}>
          <img src={EmployerPage} alt={t('landingPage.employerIconAlt')} className={styles.cardImage} />
          <CustomTypography type="hThree" style={{ marginBottom: 12 }}>
            {t('landingPage.employerTitle')}
          </CustomTypography>
          <CustomTypography
            type="textSecondaryOne"
            style={{ color: colors.lightGrey, textAlign: 'center', marginBottom: 24 }}
          >
            {t('landingPage.employerDesc')}
          </CustomTypography>
          <button className={`${styles.button} ${styles.buttonBlue}`}>
            <CustomTypography type="button">{t('landingPage.employerButtonText')}</CustomTypography>
            <span style={{ fontSize: 20, marginLeft: 8 }}>{t('landingPage.arrow')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
