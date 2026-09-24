import { useEffect, useState } from 'react';

export const BOOT_HERO_SLOT_ID = 'hero-form-slot';

export const useBootHeroSlot = () => {
  const [formSlot] = useState<HTMLElement | null>(() =>
    typeof document === 'undefined'
      ? null
      : document.getElementById(BOOT_HERO_SLOT_ID),
  );

  useEffect(() => {
    const boot = document.querySelector<HTMLElement>('[data-lcp-boot-hero]');
    if (!boot) return undefined;
    boot.hidden = false;
    return () => {
      boot.hidden = true;
    };
  }, []);

  return formSlot;
};
