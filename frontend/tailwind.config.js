/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        "primary-200": "#FF6F61", // Coral red for primary buttons/CTAs
        "primary-100": "#FF5A4E", // Darker coral for hover states

        // Secondary Colors
        "secondary-200": "#007BFF", // Bright blue for secondary buttons
        "secondary-100": "#66B2FF", // Lighter blue for hover states

        // Background Colors
        "bg-dark": "#333333", // Dark charcoal for header/footer
        "bg-light": "#FFFFFF", // White for cards/containers
        "bg-border": "#E5E5E5", // Light gray for borders

        // Text Colors
        "text-dark": "#333333", // Dark charcoal for headings
        "text-body": "#555555", // Lighter charcoal for body text
        "text-light": "#FFFFFF", // White text for dark backgrounds

        // Accent Colors
        "accent-price": "#FFD700", // Gold for prices/discounts

        // Status Colors
        error: "#EF4444", // Red for errors
        success: "#22C55E", // Green for success
        warning: "#F59E0B", // Amber for warnings
        info: "#3B82F6", // Blue for information
      },
    },
  },
  plugins: [],
};
