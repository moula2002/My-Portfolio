import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button
  onClick={toggleTheme}
  aria-label="Toggle dark mode"
  className={cn(
    "fixed top-7 right-7 md:top-10 md:right-6 z-50 p-10 rounded-full transition-colors duration-300",
    "focus:outline-none"
  )}
>
  {isDarkMode ? (
    <Sun className="h-6 w-6 text-yellow-300" />
  ) : (
    <Moon className="h-6 w-6 text-blue-900" />
  )}
</button>

  );
};
