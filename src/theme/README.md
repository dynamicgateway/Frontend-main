# Dynamic Theme System

This system automatically changes Material-UI theme direction based on your app's language/direction state.

## How It Works

1. **Automatic Integration**: The `DynamicThemeProvider` automatically connects to your Redux store
2. **Real-time Updates**: When language/direction changes, the Material-UI theme updates automatically
3. **RTL Support**: All Material-UI components automatically support RTL layout

## Usage

### In Components

```tsx
import { useThemeDirection } from '@/theme/use-theme-direction';

const MyComponent = () => {
  const { direction, isRtl } = useThemeDirection();

  return <div dir={direction}>{isRtl ? 'RTL Content' : 'LTR Content'}</div>;
};
```

### Automatic RTL Support

The following Material-UI components automatically support RTL:

- **Tabs**: Tab order and indicator positioning
- **TextField**: Input text alignment and icon positioning
- **Button**: Icon positioning and margins
- **Dialog/Menu/Modal**: Positioning and animations
- **All other components**: Automatic RTL behavior

## Configuration

The theme automatically detects your app's direction from Redux:

- `direction: 'rtl'` → Hebrew/Arabic layout
- `direction: 'ltr'` → English/other languages layout

## Benefits

✅ **No Manual Updates**: Theme changes automatically with language
✅ **Consistent RTL**: All components behave correctly in RTL mode
✅ **Performance**: Only updates when direction actually changes
✅ **Integration**: Works seamlessly with your existing language system

## Example

When you change language from Hebrew to English:

1. Redux state updates
2. `DynamicThemeProvider` detects the change
3. Material-UI theme switches from RTL to LTR
4. All components automatically adjust their layout
5. No manual component updates needed
