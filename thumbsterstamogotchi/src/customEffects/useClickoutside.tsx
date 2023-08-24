import React, { useEffect, useRef } from 'react';

export const useClickOutside = <T extends HTMLElement>(ref: React.RefObject<T>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
          callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};
