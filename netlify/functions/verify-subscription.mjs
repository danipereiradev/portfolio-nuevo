import { verifySubscription } from '../../server/verifySubscription.mjs';
export const handler = (event) => verifySubscription(event);
