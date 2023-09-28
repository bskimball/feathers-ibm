import { useEffect, useState } from "react";
import { Switch } from "@components/ui/switch.tsx";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

function DarkModeToggle() {
  const [checked, setChecked] = useState<boolean>(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  useEffect(() => {
    if (checked) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [checked]);

  return (
    <div className="flex items-center space-x-3">
      {checked ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
      <Switch checked={checked} onCheckedChange={setChecked} />
    </div>
  );
}

export default DarkModeToggle;
