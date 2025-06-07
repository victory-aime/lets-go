import { useTheme } from "./context/ThemeProvider";

type ColorsKeys = keyof ReturnType<typeof useTheme>["colors"];

type ThemeProps = {
  light?: string;
  dark?: string;
};

export function useThemeColor(
  props: ThemeProps,
  colorName: ColorsKeys
): string {
  const { colors, mode } = useTheme();

  if (mode === "light" && props.light) {
    return props.light;
  }
  if (mode === "dark" && props.dark) {
    return props.dark;
  }

  return colors[colorName];
}
