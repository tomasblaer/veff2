'use client'

import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";

export default function ThemeSwitch() {
  const { systemTheme, theme, setTheme } = useTheme();

  const handleThemeChange = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Switch
      checked={theme === "dark"}
      onClick={handleThemeChange}
      className="dark:bg-slate-800 bg-slate-200"
    />
  );
}