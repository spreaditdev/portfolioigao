import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Globe } from "lucide-react";

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const languages = [
    { code: "pt", name: t("language.pt") },
    { code: "en", name: t("language.en") },
    { code: "es", name: t("language.es") },
    { code: "zh", name: t("language.zh") },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition-all"
          aria-label={t("language.select")}
        >
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`cursor-pointer ${currentLanguage === language.code ? "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400" : ""}`}
          >
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
