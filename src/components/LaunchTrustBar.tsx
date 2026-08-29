import { BadgeCheck, Clock, ShieldCheck, Wallet } from 'lucide-react';
import TrustBar from './TrustBar';
import {
  getLaunchAvailabilityCopy,
  getLaunchPriceLabel,
  getLaunchRemaining,
  getLaunchReserveLabel,
  isLaunchSoldOut,
  LAUNCH_DELIVERY_HOURS,
  LAUNCH_OFFER_MAX,
} from '../config/launchOffer';

const LaunchTrustBar = () => {
  const remaining = getLaunchRemaining();
  const soldOut = isLaunchSoldOut();

  const points = [
    { icon: Wallet, text: getLaunchPriceLabel() },
    { icon: Clock, text: `${LAUNCH_DELIVERY_HOURS} h máximo` },
    { icon: ShieldCheck, text: `Reserva ${getLaunchReserveLabel()}` },
    {
      icon: BadgeCheck,
      text: soldOut
        ? 'Plazas agotadas'
        : `${remaining} / ${LAUNCH_OFFER_MAX} plazas`,
    },
  ];

  return (
    <>
      <TrustBar points={points} />
      <p className='sr-only'>{getLaunchAvailabilityCopy()}</p>
    </>
  );
};

export default LaunchTrustBar;
