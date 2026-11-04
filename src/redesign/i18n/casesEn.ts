import type { CaseItem } from '../cases';

type CaseText = Omit<CaseItem, 'slug' | 'name' | 'image' | 'url'>;

// Traducción al inglés de src/redesign/cases.ts. Las reseñas se traducen
// y se marcan como traducidas.
export const CASES_EN: Record<string, CaseText> = {
  'camisetas-ahora': {
    sector: 'Screen printing and custom apparel',
    city: 'Logroño',
    services: ['eCommerce', 'Web design'],
    title: ['FROM LOCAL WORKSHOP', 'TO ALL OF', 'SPAIN.'],
    result: 'From a screen-printing workshop in Logroño to selling custom T-shirts all over Spain.',
    before: 'A screen-printing workshop selling to customers in and around Logroño.',
    after: 'An online store selling custom garments all over Spain.',
    challenge:
      'Camisetas Ahora had the craft, but their market ended where the city did. Their customers came from Logroño and the surrounding area, and every custom order meant talking to the workshop. To grow, they needed anyone, anywhere in Spain, to be able to design their garment and buy it on their own.',
    work: [
      { t: 'Online customiser', d: 'Customers choose the garment, colour and size, upload their design and see how it looks before buying. No emails, no back-and-forth quotes.' },
      { t: 'A store built to buy', d: 'A catalogue with filters by sector so companies, bands or events find their garment in seconds.' },
      { t: 'End-to-end ordering', d: 'Cart, payment and shipping across Spain in a short process that works smoothly on mobile.' },
      { t: 'Workshop dashboard', d: 'Orders arrive with the design and details ready for production, without chasing anyone.' },
    ],
    outcomes: [
      { k: 'Before', v: 'Customers in Logroño' },
      { k: 'Now', v: 'Orders from all over Spain' },
      { k: 'How people buy', v: 'Online, no quotes needed' },
    ],
    quote: {
      text: 'They understood exactly the vibe I was after.',
      author: 'Irene Ibáñez',
      role: 'Camisetas Ahora · Google review (translated)',
    },
  },
  hatena: {
    sector: 'Veterinary clinic',
    city: 'Ourense',
    services: ['Web design', 'SEO'],
    title: ['FROM INVISIBLE', 'ON GOOGLE', 'TO FULLY BOOKED.'],
    result: 'From not showing up on Google to having the schedule practically full every day.',
    before: 'A clinic that didn’t show up on Google.',
    after: 'A schedule that’s practically full every day.',
    challenge:
      'Hatena had a great team and everything ready to see patients in Ourense, but online it didn’t exist. Anyone searching for a vet nearby found other clinics. With no visibility, bookings depended on word of mouth.',
    work: [
      { t: 'Custom website', d: 'Clear services, team and contact options, with appointment requests one tap away on mobile.' },
      { t: 'Local SEO', d: 'Structure, copy and data built for vet searches in Ourense.' },
      { t: 'Google Business Profile', d: 'An optimised profile to appear on the map when someone searches nearby.' },
      { t: 'Fast and easy', d: 'Optimised loading so nobody leaves before seeing how to book.' },
    ],
    outcomes: [
      { k: 'Before', v: 'No presence on Google' },
      { k: 'Now', v: 'Schedule almost full daily' },
      { k: 'Where clients come from', v: 'Google search and Maps' },
    ],
    quote: {
      text: 'Excellent service, with a great professional who supports you and understands your needs — and it shows in the results. Highly recommended!',
      author: 'Deborah García',
      role: 'Hatena · Google review (translated)',
    },
  },
  'carper-sonido': {
    sector: 'Professional sound and events',
    city: 'Vigo',
    services: ['Web design', 'SEO'],
    title: ['THE SOUND', 'THAT RINGS', 'IN VIGO.'],
    result: 'Ranked first on Google as a sound company in Vigo for a wide range of searches.',
    before: 'A sound company that relied on the same old contacts.',
    after: 'A go-to name on Google for sound and events in Vigo.',
    challenge:
      'In the sound and events industry, if you don’t show up on Google when someone is planning a wedding, a concert or a corporate event, you don’t exist. Carper Sonido had the experience and the equipment; what it lacked was appearing when someone in Vigo searched for sound for their event.',
    work: [
      { t: 'Showcase website', d: 'Services, technical equipment and event types explained so customers can tell in seconds if it’s a fit.' },
      { t: 'SEO by service', d: 'A dedicated page for each service and every important search in Vigo.' },
      { t: 'Content that ranks', d: 'Copy written with the words people use when looking for sound for their event.' },
      { t: 'Direct contact', d: 'Quote request and WhatsApp always at hand, so no one in a hurry is lost.' },
    ],
    outcomes: [
      { k: 'Before', v: 'Little visibility on Google' },
      { k: 'Now', v: 'Number one for many searches' },
      { k: 'Where', v: 'Sound and events in Vigo' },
    ],
    quote: {
      text: 'We ranked first for quite a few keywords. (…) Very happy with the result.',
      author: 'Jose Carlos',
      role: 'Carper Sonido · Google review (translated)',
    },
  },
};
