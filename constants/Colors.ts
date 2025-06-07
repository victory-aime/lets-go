const tintColorLight = "#2f95dc";

const lightThemeColors = {
  primary: "#6200EE",
  secondary: "#03DAC6",
  background: "#FFFFFF",
  surface: "#FFFFFF",
  error: "#B00020",
  text: "#000000",
  onSecondary: "#000000",
  onBackground: "#000000",
  onSurface: "#000000",
  onError: "#FFFFFF",
  pink: "#ff4081",
  white: "#ffffff",
};

const darkThemeColors = {
  primary: "#6200EE",
  secondary: "#03DAC6",
  background: "#121212",
  surface: "#121212",
  error: "#CF6679",
  text: "#FFFFFF",
  onSecondary: "#000000",
  onBackground: "#FFFFFF",
  onSurface: "#FFFFFF",
  onError: "#000000",
  pink: "#ff4081",
  white: "#ffffff",
};
export type AppThemeColors = typeof lightThemeColors;

export default { light: lightThemeColors, dark: darkThemeColors };
