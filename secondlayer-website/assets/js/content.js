/*
  SECOND LAYER — single content file.
  Edit text, prices and links here. No other file needs to change.
*/
window.SL = {
  site: "https://www.secondlayer.co.in",

  contact: {
    email: "support.secondlayer@gmail.com",
    instagram: "https://www.instagram.com/secondlayer.co.in",
    instagramHandle: "@secondlayer.co.in",
    // Leave blank until the WhatsApp Business number is ready.
    // Format: country code + number, digits only, e.g. "919876543210".
    whatsapp: "",
    // Call booking link for international visitors (Calendly, Cal.com...). Blank = use the audit form.
    bookingLink: "",
    // Form submissions are POSTed here. On Vercel this is the function in /api/lead.js.
    leadEndpoint: "/api/lead"
  },

  flags: {
    foundingOffer: true // slim banner on the pricing page
  },

  foundingOffer: "Founding client offer: the first 3 clients get 30% off in exchange for a testimonial and case study.",

  nav: [
    { label: "Home", href: "/", page: "home" },
    { label: "Services", href: "/services", page: "services" },
    { label: "Pricing", href: "/pricing", page: "pricing" },
    { label: "About", href: "/about", page: "about" },
    { label: "Work", href: "/portfolio", page: "portfolio", tag: "Soon" },
    { label: "Contact", href: "/contact", page: "contact" }
  ],

  businessTypes: ["Cafe / Restaurant", "Salon", "Gym", "Clinic", "Car studio", "Hotel", "Other"],

  tagline: "Your business needs a second layer.",

  /* ---------- Problems we solve ---------- */
  problems: [
    { icon: "moon", title: "Enquiries go unanswered after hours", text: "A customer messages at 10 pm, gets no reply and books somewhere else by morning.", fixTitle: "Every enquiry answered in seconds", fix: "Auto-replies answer and book for you, day or night." },
    { icon: "pin", title: "You are hard to find on Google", text: "People search \"near me\" and see your competitor first, with better photos and more reviews.", fixTitle: "You show up when locals search", fix: "A complete, optimised Google Business Profile." },
    { icon: "calendar", title: "No way to book or order online", text: "Every booking needs a phone call, and nobody picks up during rush hour.", fixTitle: "Customers book and order on their own", fix: "Online booking and QR ordering that run without a phone call." },
    { icon: "gauge", title: "A slow or outdated website", text: "Your site takes too long to open on a phone, or you do not have one at all.", fixTitle: "A site that opens fast and sells", fix: "A mobile-first website built to bring enquiries." },
    { icon: "star", title: "Happy customers never leave a review", text: "They mean to, then forget. Your rating stays stuck while others climb.", fixTitle: "Reviews with a single tap", fix: "A tap-to-review NFC card and automatic review requests." },
    { icon: "repeat", title: "You answer the same questions all day", text: "Timings, prices, location, availability. Hours go into typing the same replies.", fixTitle: "The right answer, sent for you", fix: "Workflows reply with timings, prices and directions." }
  ],

  /* ---------- Free business check (the interactive tool) ---------- */
  // Each "No" or "Not sure" answer points to the service that fixes it.
  check: [
    { q: "Do you have a website that opens fast on a phone?", fix: "websites", gap: "Customers who check you online leave before they see what you offer." },
    { q: "Can customers book or order without calling you?", fix: "systems", gap: "Bookings and orders depend on someone being free to answer the phone." },
    { q: "Does every enquiry get a reply within minutes, even after hours?", fix: "automation", gap: "Late-night enquiries go cold and book with a competitor." },
    { q: "Is your Google Business Profile complete, with photos, hours and services?", fix: "gbp", gap: "You are harder to find when locals search \"near me\"." },
    { q: "Do happy customers have a quick way to leave you a Google review?", fix: "gbp", gap: "Your rating grows slowly, even when customers are happy." },
    { q: "Do customers get booking reminders and follow-ups without you sending them?", fix: "automation", gap: "No-shows and forgotten follow-ups cost you repeat visits." }
  ],

  /* ---------- "Pick your business" selector ---------- */
  // img = file name in assets/img/photos (without the size and extension).
  industries: [
    { id: "cafe", img: "cafe-restaurant-website-and-ordering", alt: "Cafe interior with wooden tables, ready for QR menu ordering", label: "Cafe / Restaurant", headline: "Fill tables and take orders without the phone ringing.", points: ["QR menu with table and takeaway ordering", "Google profile with your menu, photos and correct timings", "Instant replies for reservations and party orders"], suggest: "Booking & Ordering Systems" },
    { id: "salon", img: "salon-online-appointment-booking", alt: "Modern hair salon with styling chairs and mirrors", label: "Salon", headline: "Let clients pick a slot while you are busy with a client.", points: ["Online booking by service and time slot", "Automatic reminders before each appointment", "A review request after every visit"], suggest: "Booking & Ordering Systems" },
    { id: "gym", img: "gym-membership-booking-system", alt: "Gym floor with weights and training equipment", label: "Gym", headline: "Turn trial enquiries into paying members.", points: ["Membership sign-up and registration", "Class and free-trial booking", "Follow-ups for people who asked but never joined"], suggest: "Booking & Ordering Systems" },
    { id: "clinic", img: "clinic-appointment-booking-system", alt: "Clean, bright clinic treatment room", label: "Clinic", headline: "Fewer calls at the front desk, fewer missed appointments.", points: ["Appointment booking with doctor timings", "Reminders and follow-up visit nudges", "A clear profile: hours, services and directions"], suggest: "Booking & Ordering Systems" },
    { id: "car", img: "car-detailing-studio-website", alt: "Black sports car under studio lights in a detailing garage", label: "Car studio", headline: "Show your builds and collect serious quote requests.", points: ["A website that shows your work and service packages", "Quote requests that capture car model and service", "Slot booking for detailing, wraps and installs"], suggest: "Websites" },
    { id: "hotel", img: "hotel-room-booking-website", alt: "Bright hotel lobby with a reception desk", label: "Hotel", headline: "Take room enquiries directly, day and night.", points: ["Room enquiry and booking requests on your own site", "Instant replies to room and event enquiries", "Google profile with rooms, photos and amenities"], suggest: "Booking & Ordering Systems" }
  ],

  /* ---------- Services ---------- */
  servicesIntro: {
    eyebrow: "Our Services",
    title: "Digital solutions that help your business get discovered, get customers, and run smarter.",
    text: "We build more than just websites. From your online presence to business automation, we create digital systems that make everyday business operations easier."
  },
  servicesOutro: {
    title: "One business. Four ways to grow.",
    text: "Whether you're starting from scratch or improving an existing business, we help you build a stronger digital presence."
  },
  services: [
    {
      id: "websites", img: "website-design-for-local-business", imgAlt: "Laptop keyboard lit in violet and orange light, website design for local businesses", icon: "globe",
      name: "Websites", outcome: "Make your first impression count.",
      summary: "Professional, fast, mobile-friendly websites that build trust and turn visitors into customers.",
      description: "Get a professional, fast, and mobile-friendly website that showcases your business, builds trust, and turns visitors into customers.",
      includes: ["Custom-designed websites that match your brand", "Mobile-first and responsive layouts", "Clear service, product, and business information", "WhatsApp integration and enquiry forms", "SEO-friendly structure and performance optimisation"],
      chip: { title: "New enquiry", text: "From your website, just now" },
      from: { in: 11999, intl: 600 }
    },
    {
      id: "systems", img: "qr-menu-online-ordering-system", imgAlt: "Phone on a cafe table next to the menu, QR menu and online ordering system", icon: "calendar",
      name: "Booking & Ordering Systems", outcome: "Let customers book, order, and interact on their own.",
      summary: "Appointments, QR ordering, room bookings and memberships, without waiting for a phone call.",
      description: "Make it easier for customers to access your services without waiting for a phone call. We build simple, customised systems that help manage bookings, orders, and enquiries.",
      includes: ["Online appointment and reservation systems", "QR-based food ordering systems", "Room and service booking management", "Membership and customer registration systems", "Automated booking confirmations and notifications"],
      chip: { title: "Table 4 · Order placed", text: "Sent to your phone" },
      from: { in: 14999, intl: 1200 }
    },
    {
      id: "automation", img: "whatsapp-business-automation", imgAlt: "Person replying to a customer message on a phone, WhatsApp business automation", icon: "bolt",
      name: "Business Automation", outcome: "Stop doing manually what technology can do for you.",
      summary: "Workflows that reply to enquiries, send reminders and follow up, so you don't have to.",
      description: "Save time and reduce repetitive work with automated workflows that handle everyday tasks, respond to enquiries, and keep your business running smoothly.",
      includes: ["Automated customer enquiry responses", "WhatsApp and email notifications", "Appointment reminders and follow-ups", "Lead collection and management", "Custom AI-powered workflows and integrations"],
      chip: { title: "Auto-reply sent", text: "11:42 pm · while you were closed" },
      from: { in: 7499, intl: 450 }
    },
    {
      id: "gbp", img: "google-business-profile-local-seo", imgAlt: "Hand holding a phone showing a map with a location pin, Google Business Profile local SEO", icon: "pin",
      name: "Google Business Profile + NFC Review Card", outcome: "Get discovered locally. Make it easier for customers to trust you.",
      summary: "An optimised Google Business Profile, plus a custom tap-to-review NFC card.",
      description: "Improve how your business appears on Google and make collecting customer reviews easier with a tap-to-review NFC card.",
      includes: ["Google Business Profile setup and optimisation", "Business details, services, and category optimisation", "Location and contact information setup", "Review collection strategy", "Custom NFC review card", "Delivery of the NFC card across India"],
      nfc: true,
      from: { in: 1999, intl: 210 }
    }
  ],

  /* ---------- How it works ---------- */
  steps: [
    { title: "Free audit", text: "We check your website and Google profile and show you where customers are being lost." },
    { title: "Plan and quote", text: "You get the project scope, timeline and final cost before we start. No surprises later." },
    { title: "Build", text: "We build, you review. Revision rounds are included." },
    { title: "Launch", text: "We launch, show you how everything works, and stay on hand for questions." }
  ],
  delivery: "Website: 3 to 4 business days · Booking or ordering system: 1 to 2 weeks · Automation: 5 to 7 business days",

  /* ---------- Pricing ---------- */
  regions: {
    in: { label: "India", sub: "Prices in ₹" },
    intl: { label: "International", sub: "UK · US · Canada · UAE, prices in $" }
  },
  pricingIntro: {
    eyebrow: "Pricing",
    title: "Everything your business needs to build a stronger digital presence.",
    text: "Choose the service that fits your business goals. Every solution is customised to your requirements, with clear deliverables and no unnecessary extras."
  },
  // One plan per service. "service" links a plan to its entry in services above.
  plans: [
    { service: "websites", name: "Websites", price: { in: 11999, intl: 600 }, per: "/ project", cta: "Get my website",
      desc: "A professional online presence for businesses that want to showcase their services, build credibility, and attract potential customers.",
      includes: ["Custom-designed, 5-7 page website", "Design tailored to your business and brand", "Mobile-responsive layout", "Business information and service sections", "WhatsApp and social media integration", "Customer enquiry form with instant notifications", "Basic SEO setup and speed optimisation", "Free domain for 1 year", "Free hosting for 1 year", "2 rounds of revisions", "3-4 business days delivery", "Additional pages charged separately"],
      bestFor: "Small businesses, salons, cafes, consultants, and service providers." },
    { service: "systems", name: "Booking & Ordering Systems", price: { in: 14999, intl: 1200 }, per: "/ project", cta: "Get my booking system",
      desc: "A customised digital system that lets your customers book appointments, place orders, or make enquiries without depending on phone calls.",
      includes: ["Custom booking or ordering website", "Business-specific booking/order flow", "Customer booking and enquiry forms", "Admin dashboard to manage requests", "Booking and order notifications", "WhatsApp integration", "Customer and booking data management", "Mobile-responsive design", "Basic SEO and performance optimisation", "Free domain and hosting for 1 year", "3 rounds of revisions", "1-2 weeks delivery"],
      bestFor: "Restaurants, cafes, hotels, salons, gyms, clinics, and businesses that manage regular bookings or orders." },
    { service: "automation", name: "Business Automation", price: { in: 7499, intl: 450 }, per: "/ project", cta: "Automate my business",
      desc: "Automate repetitive tasks, respond to customer enquiries faster, and spend less time on manual follow-ups.",
      includes: ["One customised automation workflow", "Automated enquiry collection and responses", "WhatsApp or email notifications (where supported)", "Lead capture and organisation", "Automated reminders or follow-ups", "Integration with supported business tools", "Workflow testing and setup", "Basic documentation and handover", "1 round of revisions", "5-7 business days delivery"],
      bestFor: "Businesses that receive regular enquiries, manage leads, or spend too much time on repetitive tasks." },
    { service: "gbp", name: "Google Business Profile + NFC Review Card", price: { in: 1999, intl: 210 }, per: "/ project", cta: "Get found on Google",
      desc: "Improve your local visibility on Google and make it easier for happy customers to leave reviews with a simple tap.",
      includes: ["Google Business Profile setup or optimisation", "Business name, category, contact, and location details", "Services and business description optimisation", "Business hours and relevant information setup", "Google review link and QR code", "Custom NFC tap-to-review card", "NFC card testing and configuration", "Delivery across India (takes up to 2 weeks)"],
      bestFor: "Local shops, restaurants, cafes, salons, hotels, and service-based businesses." }
  ],

  priceNotesTitle: "A few things to know",
  priceNotes: [
    "All prices are starting prices. Final pricing depends on your requirements and project complexity.",
    "Domain and hosting are included for one year only in the services where specified.",
    "Third-party subscriptions, paid APIs, WhatsApp API charges, and external software fees are not included unless agreed in advance.",
    "Additional features and integrations can be quoted separately.",
    "We share the project scope, timeline, and final cost before starting work."
  ],

  pricingOutro: {
    title: "Not sure what your business needs?",
    text: "Tell us about your business. We'll help you find the right digital solution."
  },

  /* ---------- FAQ ---------- */
  faq: [
    { q: "How long does it take?", a: "A website takes 3 to 4 business days. A booking or ordering system takes 1 to 2 weeks, and an automation 5 to 7 business days. The NFC review card is delivered across India within 2 weeks." },
    { q: "What do you need from me?", a: "Your logo, photos, a list of services with prices, and your business details. If you do not have good photos or text, we will help you put them together." },
    { q: "Who owns the website?", a: "You do. After the final payment, the website, the domain and all the content are yours." },
    { q: "Are there monthly costs?", a: "There is no fixed monthly fee. Domain and hosting are included for the first year where specified. Third-party subscriptions, paid APIs and WhatsApp API charges are only added if your project needs them, and we agree them with you first." },
    { q: "What is free, and what is paid?", a: "The business audit is free: we check your website and Google profile and tell you what we find. Every service, including the Google Business Profile setup and NFC review card, is paid, at the prices shown on our pricing page." },
    { q: "How do I pay?", a: "50% in advance to start and 50% at launch. We share the scope, timeline and final cost before any work begins." },
    { q: "You are a new studio. Why should I trust you?", a: "Fair question. We will not show you invented reviews. This website is our first project, so judge us by it. The audit is free, and you only pay if the plan makes sense to you." }
  ]
};
