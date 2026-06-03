// Two theme presets: `minimalGray` and `coastal`.
export const minimalGray = {
  colors: {
    // Neutral grayscale used as `earth` tokens so existing references keep working
    earth: {
      900: '#0F1720',
      800: '#1F2933',
      700: '#374151',
      600: '#4B5563',
      500: '#6B7280',
      400: '#9AA0A6',
      300: '#D1D5DB',
      200: '#E5E7EB',
      100: '#ECEFF3',
      50: '#F7F8FA',
    },
    // Primary accent group (kept name `gold` for compatibility)
    gold: {
      900: '#0B1220',
      800: '#111827',
      700: '#1F2933',
      600: '#374151',
      500: '#6B7280',
      400: '#111827',
      300: '#636B73',
      200: '#A3A9AF',
      100: '#E6E9EC',
    },
    green: {
      800: '#14532D',
      600: '#16A34A',
      400: '#6EE7B7',
      100: '#ECFDF5',
    },
    red: {
      800: '#7F1D1D',
      600: '#DC2626',
      100: '#FEF2F2',
    },
    blue: {
      800: '#0B2440',
      600: '#2563EB',
      100: '#E6F0FF',
    },
    white: '#FFFFFF',
    offwhite: '#F7F8FA',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(16,24,40,0.06)',
    md: '0 4px 16px rgba(16,24,40,0.08)',
    lg: '0 8px 32px rgba(16,24,40,0.10)',
  },
  transition: 'all 0.18s ease',
}

export const coastal = {
  colors: {
    earth: {
      900: '#0F1720',
      800: '#111827',
      700: '#374151',
      600: '#4B5563',
      500: '#6B7280',
      400: '#9AA0A6',
      300: '#D1D5DB',
      200: '#E5E7EB',
      100: '#ECEFF3',
      50: '#F7F8FA',
    },
    gold: {
      900: '#052338',
      800: '#0C447C',
      700: '#185FA5',
      600: '#1976D2',
      500: '#39A2DB',
      400: '#7EC8F7',
      300: '#BEEAFB',
      200: '#EAF8FF',
      100: '#F4FBFF',
    },
    green: {
      800: '#0F5F43',
      600: '#2E8B57',
      400: '#63C48F',
      100: '#ECFDF5',
    },
    red: {
      800: '#6B1F1F',
      600: '#D14343',
      100: '#FFF1F1',
    },
    blue: {
      900: '#051A2B',
      800: '#072E4F',
      700: '#0B477C',
      600: '#105FAF',
      500: '#1679D6',
      400: '#4FAEFF',
      300: '#8BC9FF',
      200: '#BFDEFF',
      100: '#E6F2FF',
      50: '#F3F9FF',
    },
    white: '#FFFFFF',
    offwhite: '#F4FBFF',
  },
  fonts: {
    display: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(12,59,87,0.06)',
    md: '0 4px 16px rgba(12,59,87,0.08)',
    lg: '0 8px 32px rgba(12,59,87,0.10)',
  },
  transition: 'all 0.18s ease',
}

// Active theme used across the app — set to `coastal` per request.
export const theme = coastal

// Helper export: other available presets
export const themes = { minimalGray, coastal }
