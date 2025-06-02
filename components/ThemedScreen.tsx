import { useColorScheme } from 'nativewind';
import { View, ViewProps } from "react-native";

export function ThemedScreen({ children, className = "", ...props }: ViewProps & { children: React.ReactNode }) {
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View
      className={`${isDark ? "bg-darkBackground" : "bg-white"} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}