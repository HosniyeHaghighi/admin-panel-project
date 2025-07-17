/** @type {import('tailwindcss').Config} */
export default { 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  
  theme: {
    extend: {
      
      colors: {
        'page': '#F4F7FE',
        'header-sidebar': '#1A1D2E',
        'card': '#FFFFFF',
        'text-primary': '#1A1D2E',
        'text-secondary': '#6A7187',
        'text-light': '#E0E0E0',
        'border-color': '#E5E9F2',
        'accent': '#3F83F8',
        'status': {
          'new-bg': '#EBF2FE',
          'new-text': '#3F83F8',
          'progress-bg': '#FFF8E1',
          'progress-text': '#F59E0B',
          'ready-bg': '#E6F7F0',
          'ready-text': '#10B981',
          'cancelled-bg': '#FEE2E2',
          'cancelled-text': '#EF4444',
        },
      },
      spacing: {
        'main': '24px', 
      },
      borderRadius: {
        'main': '12px',
        'card': '8px',
      },
      position: {
        'sticky': 'sticky',
      },
      top: {
        'main': '24px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), 
  ],
}