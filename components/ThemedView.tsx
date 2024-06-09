import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  withBackground?: boolean;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  withBackground = false,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  if (withBackground) {
    return (
      <View
        style={[
          {
            backgroundColor,
            flex: 1,
          },
          style,
        ]}
        {...otherProps}
      />
    );
  }

  return <View style={style} {...otherProps} />;
}
