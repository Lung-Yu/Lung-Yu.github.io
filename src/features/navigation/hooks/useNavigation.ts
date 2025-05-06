import { useState, useEffect } from 'react';
import navigationData from '../data/navigations.json';
import type { MenuItem } from '../types';

export const useNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    if (isNavOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isNavOpen]);

  const menuItems: MenuItem[] = navigationData.menuItems;

  return {
    isScrolled,
    isNavOpen,
    setIsNavOpen,
    menuItems
  };
};