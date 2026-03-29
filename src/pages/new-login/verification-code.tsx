import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTypography } from '@/components/custom-typography';
import { colors } from '@/theme/colors';
import { useThemeDirection } from '@/theme/use-theme-direction';

interface VerificationCodeProps {
  onSubmit: (code: string) => void;
  onResendCode: () => void;
}

export const VerificationCode: React.FC<VerificationCodeProps> = ({ onSubmit, onResendCode }) => {
  const { t } = useTranslation();
  const { direction } = useThemeDirection();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(0);

  // Focus on first input when component mounts
  React.useEffect(() => {
    const firstInput = document.getElementById('code-input-0');
    if (firstInput) {
      firstInput.focus();
    }
  }, []);

  // Global keyboard listener for number input
  React.useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (/^\d$/.test(e.key)) {
        // Find the current focused input or use currentFocusIndex
        const currentInput = document.getElementById(`code-input-${currentFocusIndex}`);
        if (currentInput) {
          // Update the code state
          const newCode = [...code];
          newCode[currentFocusIndex] = e.key;
          setCode(newCode);

          // Move to next input if available
          if (currentFocusIndex < 5) {
            setTimeout(() => {
              setCurrentFocusIndex(currentFocusIndex + 1);
              const nextInput = document.getElementById(`code-input-${currentFocusIndex + 1}`);
              if (nextInput) {
                nextInput.focus();
              }
            }, 50);
          }
        }
      }
    };

    document.addEventListener('keydown', handleGlobalKeyPress);
    return () => {
      document.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [currentFocusIndex, code]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input if current input is filled
      if (value && index < 5) {
        setTimeout(() => {
          setCurrentFocusIndex(index + 1);
          const nextInput = document.getElementById(`code-input-${index + 1}`);
          if (nextInput) {
            nextInput.focus();
          }
        }, 50); // Small delay to ensure smooth transition
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace to go to previous input
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      setCurrentFocusIndex(index - 1);
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }

    // Handle arrow keys for navigation
    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      setCurrentFocusIndex(index - 1);
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }

    if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      setCurrentFocusIndex(index + 1);
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleSubmit = () => {
    const fullCode = code.join('');
    if (fullCode.length === 6) {
      onSubmit(fullCode);
    }
  };

  const isCodeComplete = code.every((digit) => digit !== '');

  // Auto-submit when code is complete
  React.useEffect(() => {
    if (isCodeComplete) {
      const fullCode = code.join('');
      onSubmit(fullCode);
    }
  }, [isCodeComplete, code, onSubmit]);

  return (
    <div className="mb-46 space-y-8 px-12 pt-4 pb-6">
      {/* Main Instruction */}
      <div className="text-center">
        <CustomTypography
          type="textThird"
          style={{
            color: colors.darkGrey,
            lineHeight: '1.5',
          }}
        >
          {t('verificationCode.mainInstruction')}
        </CustomTypography>
      </div>

      {/* Code Input Fields */}
      <div className="mt-[91px] flex justify-center">
        <div
          className="flex gap-3"
          style={{
            flexDirection: 'row', // Always left-to-right regardless of site direction
            direction: 'ltr', // Force left-to-right for the code boxes
          }}
        >
          {code.map((digit, index) => (
            <div key={index} className="flex flex-col items-center">
              <TextField
                id={`code-input-${index}`}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
                onFocus={() => setCurrentFocusIndex(index)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: 'center',
                    fontSize: '24px',
                    fontWeight: 'bold',
                    cursor: 'default',
                  },
                  readOnly: false,
                }}
                sx={{
                  width: '60px',
                  height: '60px',
                  pointerEvents: 'none',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: currentFocusIndex === index ? colors.white : colors.white,
                    transition: 'all 0.2s ease',
                    '& fieldset': {
                      borderColor: currentFocusIndex === index ? colors.primaryBlue : colors.gray,
                      borderWidth: currentFocusIndex === index ? '2px' : '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: currentFocusIndex === index ? colors.primaryBlue : colors.gray,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: colors.primaryBlue,
                      borderWidth: '2px',
                    },
                  },
                  '& .MuiInputBase-input': {
                    padding: '16px 8px',
                    cursor: 'default',
                    color: colors.darkGrey,
                  },
                  '& .MuiInputBase-root': {
                    cursor: 'default',
                  },
                  // Add a subtle glow effect for the active box
                  ...(currentFocusIndex === index && {
                    boxShadow: `0 0 0 2px ${colors.primaryBlue}20`,
                  }),
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Resend Code Link */}
      <div className="text-center">
        <Button
          variant="text"
          onClick={onResendCode}
          sx={{
            color: colors.darkGrey,
            textTransform: 'none',
            padding: '4px 8px',
            minWidth: 'auto',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
        >
          <div className="flex items-center gap-1">
            <CustomTypography type="textFifth" style={{ color: colors.darkGrey }}>
              {t('verificationCode.didntReceiveCode')}
            </CustomTypography>
            <CustomTypography
              type="textFifthBold"
              style={{
                color: colors.secondaryBlue,
                cursor: 'pointer',
              }}
            >
              {t('verificationCode.clickToResend')}
            </CustomTypography>
          </div>
        </Button>
      </div>
    </div>
  );
};
