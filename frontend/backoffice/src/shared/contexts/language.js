import React, { createContext } from "react";
import PropTypes from "prop-types";
import i18n from "../../i18n";

/**
 * Language Context
 * @type {React.Context}
 */
const LanguageContext = createContext({
  changeLanguage: () => {}
});

/**
 * Language Context Provider
 * @param {object} props
 * @param {Array<React.ReactComponentElement>} props.children
 * @returns {React.ReactElement}
 */
const LanguageProvider = ({ children }) => {
  const changeLanguage = lng => {
    i18n.changeLanguage(lng);
  };

  const value = {
    changeLanguage
  };

  return <LanguageContext.Provider value={{ value }}>{children}</LanguageContext.Provider>;
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { LanguageProvider, LanguageContext };
