export const AppColors = {
  primary: {
    main: "#673ab7", // deepPurple[500]
    light: "#9575cd", // deepPurple[300]
    dark: "#512da8", // deepPurple[700]
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#d1c4e9", // deepPurple[100]
    light: "#e8eaf6", // deepPurple[50]
    dark: "#b39ddb", // deepPurple[200]
    contrastText: "#000000",
  },
  error: {
    main: "#f44336", // red[500]
    light: "#e57373", // red[300]
    dark: "#d32f2f", // red[700]
    contrastText: "#ffffff",
  },
  warning: {
    main: "#ffc107", // amber[500]
    light: "#ffd54f", // amber[300]
    dark: "#ffa000", // amber[700]
    contrastText: "#ffffff",
  },
  info: {
    main: "#03a9f4", // lightBlue[500]
    light: "#4fc3f7", // lightBlue[300]
    dark: "#0288d1", // lightBlue[700]
    contrastText: "#ffffff",
  },
  success: {
    main: "#4caf50", // green[500]
    light: "#81c784", // green[300]
    dark: "#388e3c", // green[700]
    contrastText: "#ffffff",
  },
};

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: AppColors.primary.main,
    icon: AppColors.secondary.dark,
    tabIconDefault: AppColors.secondary.main,
    tabIconSelected: AppColors.primary.main,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: AppColors.primary.light,
    icon: AppColors.secondary.light,
    tabIconDefault: AppColors.secondary.main,
    tabIconSelected: AppColors.primary.light,
  },
};
