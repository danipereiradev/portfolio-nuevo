import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isAdsLandingPath } from '../config/contact';
import {
  neutralizeAdsLandingOutbound,
  preventAdsLandingOutbound,
} from '../utils/adsLandingLinks';

const AdsLandingLinkGuard = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const isAdsLanding = isAdsLandingPath(pathname);

  useEffect(() => {
    if (!isAdsLanding) return undefined;

    neutralizeAdsLandingOutbound(document);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.target instanceof Element) {
          neutralizeAdsLandingOutbound(mutation.target.parentNode ?? document);
          continue;
        }
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) neutralizeAdsLandingOutbound(node);
        });
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['href'],
    });

    return () => observer.disconnect();
  }, [isAdsLanding]);

  if (!isAdsLanding) return children;

  return (
    <div onClickCapture={preventAdsLandingOutbound}>{children}</div>
  );
};

export default AdsLandingLinkGuard;
