import { BadgeCheck, Clock, ShieldCheck, Wallet } from 'lucide-react';
import TrustBar from './TrustBar';
import {
  getLaunchPriceLabel,
  LAUNCH_DELIVERY_LABEL,
} from '../config/launchOffer';

const LaunchTrustBar = () => {
  const points = [
    { icon: Wallet, text: getLaunchPriceLabel() },
    { icon: Clock, text: `Lista en ${LAUNCH_DELIVERY_LABEL}` },
    { icon: ShieldCheck, text: 'Pago en 2 veces' },
    { icon: BadgeCheck, text: 'Hosting y Dominio incluido' },
  ];

  return <TrustBar points={points} />;
};

export default LaunchTrustBar;
