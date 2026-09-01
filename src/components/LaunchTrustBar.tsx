import { BadgeCheck, Clock, ShieldCheck, Wallet } from 'lucide-react';
import TrustBar from './TrustBar';
import {
  getLaunchPriceLabel,
  getLaunchReserveLabel,
  LAUNCH_DELIVERY_HOURS,
} from '../config/launchOffer';

const LaunchTrustBar = () => {
  const points = [
    { icon: Wallet, text: getLaunchPriceLabel() },
    { icon: Clock, text: `Publicación en ${LAUNCH_DELIVERY_HOURS} h` },
    { icon: ShieldCheck, text: `Reserva ${getLaunchReserveLabel()}` },
    { icon: BadgeCheck, text: 'La web es tuya' },
  ];

  return <TrustBar points={points} />;
};

export default LaunchTrustBar;
