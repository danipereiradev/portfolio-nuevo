import { type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { isAdsLandingPath } from '../config/contact';
import { preventAdsLandingOutbound } from '../utils/adsLandingLinks';

const AdsLandingLinkGuard = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  if (!isAdsLandingPath(pathname)) return children;

  return (
    <div onClickCapture={preventAdsLandingOutbound}>{children}</div>
  );
};

export default AdsLandingLinkGuard;
