import type { Service } from '../services';

type ServiceText = Pick<Service, 'name' | 'area' | 'short'> & { page?: Service['page'] };

// Traducción al inglés de src/redesign/services.ts (mismo orden y claves).
export const SERVICES_EN: Record<string, ServiceText> = {
  'diseno-web': {
    name: 'Web design',
    area: 'Presence',
    short: 'Fast, clear websites built to make your phone ring, not just to look pretty.',
    page: {
      title: ['WEBSITES THAT', 'MAKE YOUR', 'PHONE RING.'],
      intro:
        'We design and build your website from scratch or on WordPress, depending on what your business needs. Fast, easy to use on mobile and with contact options always at hand, so visitors end up calling or messaging you.',
      includes: [
        { t: 'Custom design', d: 'Every section you need, with your brand and built around your customers — not a generic template.' },
        { t: 'Mobile first', d: 'Most of your visitors arrive on their phone, so we design for them first.' },
        { t: 'Direct contact', d: 'Form, WhatsApp, call and map always visible, and tested before launch.' },
        { t: 'Technical SEO base', d: 'Speed, titles, structure and data so Google understands your site from day one.' },
        { t: 'Simple editor', d: 'A dashboard to update text and photos without depending on anyone.' },
        { t: 'Full launch', d: 'Hosting, domain and go-live. Everything in your name.' },
      ],
      steps: [
        { t: 'Call', d: 'We get to know your business and what the website needs to do.' },
        { t: 'Proposal', d: 'Sections, features and timeline in writing, the same day.' },
        { t: 'Design', d: 'We show you the website before we build it and fine-tune it with you.' },
        { t: 'Launch', d: 'We go live, test everything and show you how to use it.' },
      ],
      forWho: ['Businesses that don’t have a website yet', 'Companies with an old website that brings no customers', 'Freelancers who want a professional image'],
      faq: [
        { q: 'WordPress or custom development?', a: 'Whatever your project needs. WordPress when it fits; custom development when it’s required. We explain it in the proposal and never sell you the most expensive option by default.' },
        { q: 'How long does it take?', a: 'A business website usually takes 3 to 8 weeks once we have the copy and photos. The timeline is in writing in the proposal.' },
        { q: 'Can I make changes myself?', a: 'Yes. You get a simple dashboard for text and photos. If you’d rather not touch it, maintenance is optional.' },
        { q: 'Do you redesign existing websites?', a: 'Yes. We start from your brand, content and domain and build a new website — not a patch on the old one.' },
        { q: 'Who owns the website?', a: 'You do. Domain, files and access in your name, plus a 60-day technical warranty after launch.' },
      ],
    },
  },
  ecommerce: {
    name: 'eCommerce',
    area: 'Sales',
    short: 'Online stores with a short checkout, fast payments and everything ready to sell on mobile.',
    page: {
      title: ['STORES THAT', 'SELL', 'ON MOBILE.'],
      intro:
        'We build your online store on WooCommerce, Shopify or custom code, with a short checkout, fast payment methods and a dashboard to manage products, stock and orders without hassle.',
      includes: [
        { t: 'Catalogue and product pages', d: 'Clear product pages, easy-to-pick sizes or variants and photos that sell.' },
        { t: 'Checkout in a few steps', d: 'Short cart and checkout, guest purchase and no unnecessary fields.' },
        { t: 'Fast payments', d: 'Card, Bizum, PayPal, Apple Pay and Google Pay, depending on your gateway.' },
        { t: 'Shipping', d: 'Zones, rates, in-store pickup and a free-shipping nudge to raise the average order.' },
        { t: 'Admin dashboard', d: 'Products, stock and orders from a dashboard you actually understand.' },
        { t: 'Ready for Google', d: 'SEO foundations so your products show up in search and Google Shopping.' },
      ],
      steps: [
        { t: 'Review', d: 'Catalogue, payments, shipping and what you already have.' },
        { t: 'Proposal', d: 'Platform, features and timeline in writing.' },
        { t: 'Build', d: 'Design, product upload and real test purchases.' },
        { t: 'Launch', d: 'We go live and train you to manage orders.' },
      ],
      forWho: ['Brands starting to sell online', 'Brick-and-mortar shops that want to sell beyond their neighbourhood', 'Stores that need a rebuild because they don’t convert'],
      faq: [
        { q: 'WooCommerce, Shopify or custom?', a: 'Whatever fits. With a platform you stay in control of your store; custom builds are usually for complex catalogues or processes.' },
        { q: 'How long does it take?', a: 'A store usually takes 4 to 8 weeks once we have products, photos and copy.' },
        { q: 'Can you improve my current store?', a: 'Yes. We look at where sales are being lost and tell you whether it’s worth improving or rebuilding.' },
        { q: 'Who owns the store?', a: 'You do. Domain, files and access in your name.' },
      ],
    },
  },
  seo: {
    name: 'SEO',
    area: 'Visibility',
    short: 'Get found on Google when someone nearby searches for what you do.',
    page: {
      title: ['GET', 'FOUND', 'ON GOOGLE.'],
      intro:
        'We tidy up your website under the hood, write about what your customers are searching for and look after your Google Business Profile, so you show up before your competitors — especially in your area.',
      includes: [
        { t: 'Technical audit', d: 'Speed, indexing, titles, broken links and everything Google checks before showing you.' },
        { t: 'Local SEO', d: 'Optimised Google Business Profile, reviews, categories and pages by area or neighbourhood.' },
        { t: 'Content', d: 'Pages and articles written for the real searches your customers make.' },
        { t: 'Authority', d: 'Quality mentions and links from directories and industry media.' },
        { t: 'Monthly report', d: 'Rankings, visits and calls in a report you can read in two minutes.' },
      ],
      forWho: ['Local businesses that depend on being found nearby', 'Service companies that want to stop paying for every click', 'Websites that exist but get no visits'],
      faq: [
        { q: 'How long until I see results?', a: 'Technical fixes show within weeks. Climbing for competitive searches usually takes 3 to 6 months.' },
        { q: 'Do I need a new website?', a: 'Not always. We audit yours first and tell you honestly whether it’s worth improving or rebuilding.' },
      ],
    },
  },
  sem: {
    name: 'SEM',
    area: 'Acquisition',
    short: 'Google Ads campaigns that bring customers from day one, with every euro tracked.',
    page: {
      title: ['CUSTOMERS', 'FROM', 'DAY ONE.'],
      intro:
        'We set up and manage your Google Ads campaigns so you appear right when someone is looking for what you sell — and we track every call, form and sale that comes in.',
      includes: [
        { t: 'Strategy and keywords', d: 'We target what your customers type when they’re ready to buy, not just browse.' },
        { t: 'Ads and landing pages', d: 'Copy, extensions and landing pages built to convert.' },
        { t: 'Real tracking', d: 'Call, WhatsApp and form tracking so you know which campaign works.' },
        { t: 'Ongoing optimisation', d: 'We review searches, bids and ads every week to lower your cost per customer.' },
      ],
      forWho: ['Businesses that need customers now', 'Launches and seasonal peaks', 'Companies already spending on Ads without knowing what they get back'],
      faq: [
        { q: 'Who pays Google for the ads?', a: 'You do, directly to Google. We manage the account, which is always in your name.' },
        { q: 'Can I stop whenever I want?', a: 'Yes. The campaigns are yours and can be paused at any time.' },
      ],
    },
  },
  geo: {
    name: 'GEO',
    area: 'AI',
    short: 'Get recommended by ChatGPT, Gemini and Google’s AI answers.',
    page: {
      title: ['GET', 'RECOMMENDED', 'BY AI.'],
      intro:
        'More and more people ask ChatGPT or Gemini instead of searching on Google. We prepare your website and online presence so those answers mention you.',
      includes: [
        { t: 'AI visibility check', d: 'We ask the assistants what your customers would ask and see whether — and how — you appear.' },
        { t: 'Citable content', d: 'Clear answers, facts and FAQs that AI models can use and cite.' },
        { t: 'Structured data', d: 'Schema, listings and consistent profiles so AI understands who you are and where you are.' },
        { t: 'Mentions', d: 'Presence in the sources assistants rely on: directories, reviews and media.' },
      ],
      forWho: ['Businesses that want to get ahead of their competitors', 'Companies with good SEO that also want to appear in AI', 'Brands selling trust-based services'],
      faq: [
        { q: 'Is it the same as SEO?', a: 'It shares the foundations, but it works differently: AI doesn’t show ten links, it recommends two or three names.' },
        { q: 'Can it be measured?', a: 'Yes. We regularly track the key questions and whether the assistants mention you.' },
      ],
    },
  },
  'redes-sociales': {
    name: 'Social media',
    area: 'Content',
    short: 'Instagram and social content that shows what you do and gets people messaging you.',
    page: {
      title: ['SOCIAL MEDIA', 'THAT BRINGS', 'MESSAGES.'],
      intro:
        'We plan, create and publish content that shows your real work: reels, carousels and stories designed to get people messaging you, not just to rack up likes.',
      includes: [
        { t: 'Strategy and calendar', d: 'What to say, when and in which format, built around your type of customer.' },
        { t: 'Reels and carousels', d: 'Script, editing and design in your brand identity.' },
        { t: 'Optimised profile', d: 'Bio, highlights and links so new visitors know what to do.' },
        { t: 'Reporting and improvement', d: 'Which posts bring messages and which don’t — and what we change.' },
      ],
      forWho: ['Businesses with a product or work that can be shown', 'Brands that post without a plan or results', 'Anyone without time to shoot and edit'],
      faq: [
        { q: 'Do I have to appear in the videos?', a: 'It’s not required, although it works better. We help with the script and filming to make it easy.' },
        { q: 'Which platforms do you work on?', a: 'Mainly Instagram, TikTok and LinkedIn, depending on where your customers are.' },
      ],
    },
  },
  'tranquilidad-digital': {
    name: 'Digital peace of mind',
    area: 'Representation',
    short: 'We’re on your side with suppliers, developers and platforms. You run your business; we handle the tech.',
    page: {
      title: ['YOU RUN', 'YOUR BUSINESS.', 'WE HANDLE DIGITAL.'],
      intro:
        'For businesses that know what they want but have no technical person on their side. We sit in your chair with suppliers, developers and platforms: we translate what you need, coordinate whoever does the work and make sure it’s delivered properly.',
      includes: [
        { t: 'We speak for you', d: 'We talk to agencies, developers, hosting providers and platforms on your behalf, in their language.' },
        { t: 'From idea to clear brief', d: 'We turn what you want to achieve into clear requirements nobody can misread.' },
        { t: 'Quote reviews', d: 'We compare offers and tell you what’s unnecessary, what’s missing and what price makes sense.' },
        { t: 'Nothing stalls', d: 'Schedule, deliverables and follow-up so the project keeps moving.' },
        { t: 'We test it before you do', d: 'We check every delivery before you pay for it or publish it.' },
        { t: 'One point of contact', d: 'One person who knows your business and explains things clearly.' },
      ],
      steps: [
        { t: 'You tell us', d: 'What you want to achieve and what worries you.' },
        { t: 'We put it in writing', d: 'A clear brief any supplier can understand.' },
        { t: 'We get it moving', d: 'We choose who does it and push until it’s done.' },
        { t: 'We check it with you', d: 'Nothing gets paid for or published without your approval.' },
      ],
      forWho: ['Businesses working with several digital suppliers at once', 'Anyone who’s had bad experiences with agencies or developers', 'Non-technical companies about to invest in a digital project'],
      faq: [
        { q: 'Do you do the work or coordinate it?', a: 'Both. If it fits, we do it ourselves; if you already have a supplier or another one is a better fit, we act on your side and coordinate it.' },
        { q: 'Can you review a quote I already have?', a: 'Yes. It’s one of the things we do most: we tell you whether it’s reasonable and what to ask before signing.' },
        { q: 'Do you work with suppliers you don’t know?', a: 'Yes. Our job is to understand anyone and protect your interests.' },
        { q: 'Who makes the final decision?', a: 'Always you. We give you judgement and clear options.' },
      ],
    },
  },
  'mantenimiento-web': {
    name: 'Website maintenance',
    area: 'Support',
    short: 'Updates, backups, security and fixes for your website — even if we didn’t build it.',
    page: {
      title: ['YOUR WEBSITE,', 'ALWAYS', 'WORKING.'],
      intro:
        'We take care of updates, backups, security and incidents on your website or store, whether it runs on WordPress, WooCommerce, Shopify or custom code. You’re helped by the person who actually checks your site, not a call centre.',
      includes: [
        { t: 'Updates', d: 'WordPress, themes and plugins up to date, tested before they’re applied.' },
        { t: 'Backups and security', d: 'Regular backups, monitoring and a response if anything fails.' },
        { t: 'Fixes', d: 'Errors, downtime, HTTPS, forms, integrations and issues after an update.' },
        { t: 'Small changes', d: 'Text, images, mobile tweaks and scoped improvements, depending on your plan.' },
        { t: 'Stores and apps', d: 'Checkout, payments, orders and custom apps: frontend, backend and APIs.' },
        { t: 'Clear hours', d: 'Plans and hour packs agreed before we start. We never use hours without your approval.' },
      ],
      forWho: ['Anyone who wants to forget about maintenance', 'Websites built by another company that nobody looks after', 'Broken websites that need fixing'],
      faq: [
        { q: 'What if another company built my website?', a: 'No problem: most of the issues we see come from websites built by others. We review it first and tell you whether we can take it on.' },
        { q: 'What if my website is already broken?', a: 'We start with an hour pack: we review, fix and tell you what’s left. Then, if you like, you move to a maintenance plan.' },
        { q: 'What counts as a small change?', a: 'A text, a photo, opening hours or a visual tweak. A new page or feature is quoted separately, upfront.' },
        { q: 'Is there a minimum term?', a: 'No. Monthly payments and you can cancel. We hand over access and backups.' },
      ],
    },
  },
  aplicaciones: {
    name: 'Apps',
    area: 'Product',
    short: 'Custom web, Android and iOS apps for companies and new ventures.',
    page: {
      title: ['APPS THAT', 'SOLVE', 'REAL PROBLEMS.'],
      intro:
        'We build custom web and mobile apps: internal tools, platforms and new products. We start with a useful first version and grow it with your project.',
      includes: [
        { t: 'Scoping', d: 'What the first version needs and what can wait, in writing.' },
        { t: 'Product design', d: 'Screens and flows designed for the people who will use them.' },
        { t: 'Data and logic', d: 'Users, permissions, dashboards and your business logic.' },
        { t: 'Integrations', d: 'Payments, maps, CRM and the tools you already use.' },
        { t: 'Web, Android and iOS', d: 'We choose the technology based on your project and your users.' },
        { t: 'Testing and launch', d: 'Go-live and support with app store publishing.' },
      ],
      forWho: ['An idea you want to get off the ground', 'Companies that need their own tool', 'Apps already in progress that need to keep growing'],
      faq: [
        { q: 'Web app or mobile app?', a: 'Whatever the project needs. A web app runs in the browser; if you need Android and iOS, we build that too.' },
        { q: 'Can we start with something simple?', a: 'Yes, and it’s usually the best starting point. Then we expand as the project requires.' },
        { q: 'Do you take on apps already in progress?', a: 'Yes. We review the code, access and status, and tell you what can be reused and how to continue.' },
        { q: 'Who owns the app?', a: 'It’s delivered with its code and access, as agreed in the proposal.' },
      ],
    },
  },
};
