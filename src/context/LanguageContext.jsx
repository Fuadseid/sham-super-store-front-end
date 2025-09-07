import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTranslation, loadTranslationSection } from '../utils/localization';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const getBrowserLanguage = () => {
        const storedLanguage = localStorage.getItem('preferredLanguage');
        if (storedLanguage) return storedLanguage;

        const browserLang = navigator.language || navigator.userLanguage;
        return browserLang.startsWith('ar') ? 'ar' : 'en';
    };

    const [language, setLanguage] = useState('en');
    const [direction, setDirection] = useState(language === 'ar' ? 'rtl' : 'ltr');

    useEffect(() => {
        setDirection(language === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        localStorage.setItem('preferredLanguage', language);

        if (language === 'ar') {
            document.body.classList.add('lang-ar');
            document.body.classList.remove('lang-en');
        } else {
            document.body.classList.add('lang-en');
            document.body.classList.remove('lang-ar');
        }
    }, [language]);

    const t = (path, params = {}) => {
        return getTranslation(language, path, params);
    };

    const loadSection = (section) => {
        return loadTranslationSection(language, section);
    };

    const changeLanguage = (newLanguage) => {
        if (newLanguage === 'ar' || newLanguage === 'en') {
            setLanguage(newLanguage);
        }
    };

    const value = {
        language,
        direction,
        t,
        loadSection,
        changeLanguage,
        isRTL: language === 'ar'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;