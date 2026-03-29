import React from 'react';
import { useTranslation } from 'react-i18next';
import MenuCard from '@/components/menu-card';
import CompanyInfo from '@/components/company-info';
import NavigationCarousel from '@/components/navigation-carousel';
import { ICONS_TABLE } from '@/constants/icons-constants';
import type { SvgrComponent } from '@/types/general-types';

const MainMenuPage: React.FC = () => {
  const { t } = useTranslation();

  const handleItemClick = (value: string) => {
    console.log('Menu item clicked:', value);
    // Add navigation logic based on value
    // navigate(`/${value}`);
  };

  // groups icons
  const quickActionsIcon = ICONS_TABLE.default.timer;
  const personalAreaIcon = ICONS_TABLE.default.cardId;
  const paymentsIcon = ICONS_TABLE.default.wallet;
  const certificatesIcon = ICONS_TABLE.default.filesFolder;

  const getIconComponent = (icon: SvgrComponent) => {
    return React.createElement(icon, { style: { width: '70px', height: '70px' } });
  };
  // Quick Actions menu items
  const quickActionsItems = [
    { text: t('mainMenuPage.quickActions.engineering'), value: 'engineering' },
    { text: t('mainMenuPage.quickActions.noDebtsCertificate'), value: 'no-debts-certificate' },
    { text: t('mainMenuPage.quickActions.planningInfoSheet'), value: 'planning-info-sheet' },
    { text: t('mainMenuPage.quickActions.managementCourse'), value: 'management-course' },
    { text: t('mainMenuPage.quickActions.renewalNoDebts'), value: 'renewal-no-debts' },
    { text: t('mainMenuPage.quickActions.permitInfoFile'), value: 'permit-info-file' },
    { text: t('mainMenuPage.quickActions.parking'), value: 'parking' },
    { text: t('mainMenuPage.quickActions.arnonaDiscount'), value: 'arnona-discount' },
    { text: t('mainMenuPage.quickActions.events'), value: 'events' },
    { text: t('mainMenuPage.quickActions.generalRequest'), value: 'general-request' },
    { text: t('mainMenuPage.quickActions.arnonaRates'), value: 'arnona-rates' },
  ];

  // Certificates and Forms menu items
  const certificatesItems = [
    { text: t('mainMenuPage.certificates.paymentAmount'), value: 'payment-amount' },
    { text: t('mainMenuPage.certificates.residentCertificate'), value: 'resident-certificate' },
    { text: t('mainMenuPage.certificates.openFile'), value: 'open-file' },
    { text: t('mainMenuPage.certificates.selfParticipation'), value: 'self-participation' },
    { text: t('mainMenuPage.certificates.waiverConfidentiality'), value: 'waiver-confidentiality' },
    { text: t('mainMenuPage.certificates.renewalTabuApproval'), value: 'renewal-tabu-approval' },
    { text: t('mainMenuPage.certificates.newSupplierRegistration'), value: 'new-supplier-registration' },
    { text: t('mainMenuPage.certificates.registrationClasses'), value: 'registration-classes' },
    { text: t('mainMenuPage.certificates.requestTabuApproval'), value: 'request-tabu-approval' },
    { text: t('mainMenuPage.certificates.welfare'), value: 'welfare' },
  ];

  // Personal Area menu items
  const personalAreaItems = [
    { text: t('mainMenuPage.personalArea.personalDetails'), value: 'personal-details' },
    { text: t('mainMenuPage.personalArea.myPayments'), value: 'my-payments' },
    { text: t('mainMenuPage.personalArea.accountSettings'), value: 'account-settings' },
    { text: t('mainMenuPage.personalArea.supplierAuthority'), value: 'supplier-authority' },
    { text: t('mainMenuPage.personalArea.residentCertificate'), value: 'resident-certificate' },
    { text: t('mainMenuPage.personalArea.declarationPersons'), value: 'declaration-persons' },
    { text: t('mainMenuPage.personalArea.updateDetails'), value: 'update-details' },
    { text: t('mainMenuPage.personalArea.updateStandingOrder'), value: 'update-standing-order' },
    { text: t('mainMenuPage.personalArea.updateStandingOrderPayment'), value: 'update-standing-order-payment' },
    { text: t('mainMenuPage.myProperty.propertyDetails'), value: 'property-details' },
    { text: t('mainMenuPage.myProperty.propertyAddress'), value: 'property-address' },
    { text: t('mainMenuPage.myProperty.paymentArrangement'), value: 'payment-arrangement' },
    { text: t('mainMenuPage.myProperty.permitInfoFile'), value: 'permit-info-file' },
    { text: t('mainMenuPage.myProperty.arnonaDiscounts'), value: 'arnona-discounts' },
    { text: t('mainMenuPage.myProperty.sendVoucherEmail'), value: 'send-voucher-email' },
  ];

  // Payments and Collections menu items
  const paymentsItems = [
    { text: t('mainMenuPage.payments.occasionalPayment'), value: 'occasional-payment' },
    { text: t('mainMenuPage.payments.debtBalancePayment'), value: 'debt-balance-payment' },
    { text: t('mainMenuPage.payments.voucherPayment'), value: 'voucher-payment' },
    { text: t('mainMenuPage.payments.changePayers'), value: 'change-payers' },
  ];

  const carouselData: Array<{ icon: SvgrComponent; text: string; route: string }> = [
    {
      icon: ICONS_TABLE.default.welfare,
      text: t('mainMenuPage.navigation.welfare'),
      route: '/welfare',
    },
    {
      icon: ICONS_TABLE.default.planning,
      text: t('mainMenuPage.navigation.engineering'),
      route: '/planning',
    },
    {
      icon: ICONS_TABLE.default.parking,
      text: t('mainMenuPage.navigation.parking'),
      route: '/parking',
    },

    {
      icon: ICONS_TABLE.default.shield,
      text: t('mainMenuPage.navigation.supervision'),
      route: '/supervision',
    },

    {
      icon: ICONS_TABLE.default.classesSignup,
      text: t('mainMenuPage.navigation.classes'),
      route: '/classes',
    },
  ];
  return (
    <div className="w-full">
      {/* Navigation Carousel */}
      <div className="px-85">
        <NavigationCarousel data={carouselData} />
      </div>

      <div className="mx-auto h-full max-w-[1070px]">
        {/* Top Navigation Bar */}
        {/* <div className="bg-white px-8 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div style={{ color: colors.primaryBlue, fontSize: '20px' }}>‹</div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span style={{ color: colors.primaryBlue, fontSize: '16px' }}>❤️</span>
              </div>
              <CustomTypography type="textThird" style={{ color: colors.primaryBlue }}>
                {t('mainMenuPage.navigation.welfare')}
              </CustomTypography>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span style={{ color: colors.primaryBlue, fontSize: '16px' }}>🏗️</span>
              </div>
              <CustomTypography type="textThird" style={{ color: colors.primaryBlue }}>
                {t('mainMenuPage.navigation.engineering')}
              </CustomTypography>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span style={{ color: colors.primaryBlue, fontSize: '16px' }}>P</span>
              </div>
              <CustomTypography type="textThird" style={{ color: colors.primaryBlue }}>
                {t('mainMenuPage.navigation.parking')}
              </CustomTypography>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span style={{ color: colors.primaryBlue, fontSize: '16px' }}>👁️</span>
              </div>
              <CustomTypography type="textThird" style={{ color: colors.primaryBlue }}>
                {t('mainMenuPage.navigation.supervision')}
              </CustomTypography>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                <span style={{ color: colors.primaryBlue, fontSize: '16px' }}>🎓</span>
              </div>
              <CustomTypography type="textThird" style={{ color: colors.primaryBlue }}>
                {t('mainMenuPage.navigation.classes')}
              </CustomTypography>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div style={{ color: colors.primaryBlue, fontSize: '20px' }}>›</div>
          </div>
        </div>
      </div> */}

        {/* Main Content Area */}
        <div className="py-29">
          <div className="mx-auto w-full max-w-7xl">
            <div className="flex flex-col items-center gap-16 lg:flex-row lg:items-start">
              {/* Left Column */}
              <div className="space-y-16">
                {/* Personal Area Card */}
                <MenuCard
                  icon={getIconComponent(personalAreaIcon)}
                  title={t('mainMenuPage.personalArea.title')}
                  items={personalAreaItems}
                  onItemClick={handleItemClick}
                />

                {/* Payments and Collections Card */}
                <MenuCard
                  icon={getIconComponent(paymentsIcon)}
                  title={t('mainMenuPage.payments.title')}
                  items={paymentsItems}
                  onItemClick={handleItemClick}
                />
              </div>
              {/* Right Column */}
              <div className="space-y-16">
                {/* Quick Actions Card */}
                <MenuCard
                  icon={getIconComponent(quickActionsIcon)}
                  title={t('mainMenuPage.quickActions.title')}
                  items={quickActionsItems}
                  onItemClick={handleItemClick}
                />

                {/* Certificates and Forms Card */}
                <MenuCard
                  icon={getIconComponent(certificatesIcon)}
                  title={t('mainMenuPage.certificates.title')}
                  items={certificatesItems}
                  onItemClick={handleItemClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Info Section */}
      <div className="mx-auto w-full">
        <CompanyInfo />
      </div>
    </div>
  );
};

export default MainMenuPage;
