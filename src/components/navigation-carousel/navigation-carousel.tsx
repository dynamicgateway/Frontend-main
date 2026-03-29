import React, { useCallback, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { Swiper as SwiperType } from 'swiper';
import styles from './navigation-carousel.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { LeftArrowHeadIcon, RightArrowHeadIcon } from '@/assets';

interface NavigationItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  route: string;
}

interface NavigationCarouselProps {
  data: Array<{
    icon: any; // SvgrComponent type
    text: string;
    route: string;
  }>;
}

// Constants for better maintainability
const SWIPER_CONFIG = {
  slidesPerView: 5,
  spaceBetween: 20,
  breakpoints: {
    320: { slidesPerView: 2, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 15 },
    768: { slidesPerView: 4, spaceBetween: 20 },
    1024: { slidesPerView: 5, spaceBetween: 20 },
  },
} as const;

export const NavigationCarousel: React.FC<NavigationCarouselProps> = ({ data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const swiperRef = useRef<SwiperType | null>(null);

  // Helper function to create icon container with actual icon component
  const createIconContainer = (IconComponent: any) => (
    <div className={styles.iconContainer}>
      <IconComponent style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
    </div>
  );

  // Transform props data into navigation items
  const navigationItems: NavigationItem[] = data.map((item, index) => ({
    id: `nav-item-${index}`,
    icon: createIconContainer(item.icon),
    label: item.text,
    route: item.route,
  }));

  console.log('Navigation items:', navigationItems);
  console.log('Data received:', data);

  // Event handlers with useCallback for better performance
  const handleItemClick = useCallback(
    (route: string) => {
      navigate(route);
    },
    [navigate]
  );

  const handleSwiperInit = useCallback((swiper: SwiperType) => {
    console.log('Swiper initialized:', swiper);
    swiperRef.current = swiper;
  }, []);

  const handleSlidePrev = useCallback(() => {
    console.log('Previous button clicked, swiper ref:', swiperRef.current);
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  }, []);

  const handleSlideNext = useCallback(() => {
    console.log('Next button clicked, swiper ref:', swiperRef.current);
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  }, []);

  return (
    <div className="0 relative py-8">
      <div className="mx-auto max-w-6xl px-4">
        <Swiper
          onSwiper={handleSwiperInit}
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          {...SWIPER_CONFIG}
          className={styles.navigationSwiper}
          loop={navigationItems.length > 5}
          allowTouchMove={true}
          centeredSlides={false}
          slidesPerGroup={1}
          watchSlidesProgress={true}
          updateOnWindowResize={true}
        >
          {navigationItems.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={styles.navigationItem} onClick={() => handleItemClick(item.route)}>
                {item.icon}
                <div className={styles.navigationLabel}>
                  <CustomTypography type="textFifth" style={{ color: colors.primaryBlue }}>
                    {item.label}
                  </CustomTypography>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons - Only show if there are more than 5 items */}
        {navigationItems.length > 5 && (
          <>
            <button
              className={`swiper-button-prev-custom ${styles.navigationButton} ${styles.navigationButtonPrev}`}
              onClick={handleSlidePrev}
              aria-label="Previous items"
            >
              <LeftArrowHeadIcon />
            </button>
            <button
              className={`swiper-button-next-custom ${styles.navigationButton} ${styles.navigationButtonNext}`}
              onClick={handleSlideNext}
              aria-label="Next items"
            >
              <RightArrowHeadIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};
