import Box from "@mui/material/Box";

import { useTheme } from "@mui/material/styles";
export default function ThemeContainer({ children }: { children: any }) {
  const theme = useTheme();
  return <Box bgcolor={theme.rent[1200]} color={theme.rent[100]}>{children}</Box>;
}
