import { useContext } from "react";
import { LanguageContext } from "./language";

const useLanguage = () => {
  const context = useContext(LanguageContext);
  const { changeLanguage } = context.value;
  return { changeLanguage };
};

export default useLanguage;
