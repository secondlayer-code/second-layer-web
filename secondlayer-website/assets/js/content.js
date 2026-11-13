/*
  SECOND LAYER — single content file.
  Edit text, prices and links here. No other file needs to change.
*/
window.SL = {
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
    { label: "Home", href: "index.html", page: "home" },
    { label: "Services", href: "services.html", page: "services" },
    { label: "Pricing", href: "pricing.html", page: "pricing" },
    { label: "About", href: "about.html", page: "about" },
    { label: "Work", href: "portfolio.html", page: "portfolio", tag: "Soon" },
    { label: "Contact", href: "contact.html", page: "contact" }
  ],

  businessTypes: ["Cafe / Restaurant", "Salon", "Gym", "Clinic", "Car studio", "Hotel", "Other"],

  /* ---------- Problems we solve ---------- */
  tagline: "Your business needs a second layer.",

  // Big scrolling words on the home page.
  bigWords: ["Replies", "Bookings", "Orders", "Reviews", "Enquiries", "Reminders"],

  // Photos are from Unsplash (free licence). Each value is the photo id from its Unsplash address.
  problems: [
    { icon: "moon", title: "Enquiries go unanswered after hours", text: "A customer messages at 10 pm, gets no reply and books somewhere else by morning.", fixTitle: "Every enquiry answered in seconds", fix: "Auto-replies answer and book for you, day or night." },
    { icon: "pin", title: "You are hard to find on Google", text: "People search \"near me\" and see your competitor first, with better photos and more reviews.", fixTitle: "You show up when locals search", fix: "A complete, tuned Google Business Profile." },
    { icon: "calendar", title: "No way to book or order online", text: "Every booking needs a phone call, and nobody picks up during rush hour.", fixTitle: "Customers book and order on their own", fix: "Online booking and QR ordering that run without a phone call." },
    { icon: "gauge", title: "A slow or outdated website", text: "Your site takes too long to open on a phone, or you do not have one at all.", fixTitle: "A site that opens fast and sells", fix: "A mobile-first website built to bring enquiries." },
    { icon: "star", title: "Happy customers never leave a review", text: "They mean to, then forget. Your rating stays stuck while others climb.", fixTitle: "Reviews with a single tap", fix: "An NFC review card and automatic review requests." },
    { icon: "repeat", title: "You answer the same questions all day", text: "Timings, prices, location, availability. Hours go into typing the same replies.", fixTitle: "The right answer, sent for you", fix: "Workflows reply with timings, prices and directions." }
  ],

  /* ---------- "I run a..." selector ---------- */
  industries: [
    { id: "cafe", img: "photo-1521017432531-fbd92d768814", label: "Cafe / Restaurant", headline: "Fill tables and take orders without the phone ringing.", points: ["QR menu with table and takeaway ordering", "Google profile with your menu, photos and correct timings", "Instant replies for reservations and party orders"], suggest: "Cafe & Restaurant QR Ordering" },
    { id: "salon", img: "photo-1600948836101-f9ffda59d250", label: "Salon", headline: "Let clients pick a slot while you are busy with a client.", points: ["Online booking by service and time slot", "Automatic reminders before each appointment", "A review request after every visit"], suggest: "Appointment Booking" },
    { id: "gym", img: "photo-1728486145245-d4cb0c9c3470", label: "Gym", headline: "Turn trial enquiries into paying members.", points: ["Membership sign-up and renewal reminders", "Class and free-trial booking", "Follow-ups for people who asked but never joined"], suggest: "Gym Membership & Booking" },
    { id: "clinic", img: "photo-1629909613654-28e377c37b09", label: "Clinic", headline: "Fewer calls at the front desk, fewer missed appointments.", points: ["Appointment booking with doctor timings", "Reminders and follow-up visit nudges", "A clear profile: hours, services and directions"], suggest: "Appointment Booking" },
    { id: "car", img: "photo-1567808291548-fc3ee04dbcf0", label: "Car studio", headline: "Show your builds and collect serious quote requests.", points: ["A website that shows your work and service packages", "Quote requests that capture car model and service", "Slot booking for detailing, wraps and installs"], suggest: "Signature 3D Website" },
    { id: "hotel", img: "photo-1625244724120-1fd1d34d00f6", label: "Hotel", headline: "Take room enquiries directly, day and night.", points: ["Room enquiry and booking requests on your own site", "Instant replies to room and event enquiries", "Google profile with rooms, photos and amenities"], suggest: "Hotel Enquiry & Room Booking" }
  ],

  /* ---------- Services (cards + detail page) ---------- */
  services: [
    {
      id: "websites", img: "photo-1525547719571-a2d4ac8945e2", imgAlt: "Laptop keyboard lit in violet and orange light", icon: "globe", name: "Websites", outcome: "Get chosen over the competitor",
      summary: "Fast, mobile-first websites that show what you do and how to book in the first few seconds.",
      description: "Most local customers check you online before they visit. We build a website that opens quickly on phone data, shows what you offer and what it costs, and makes it easy to call, message or book. Want to stand out? The Signature 3D website adds scroll-driven animation like the one on our home page.",
      includes: ["Mobile-first design built around your brand", "Call, WhatsApp and enquiry buttons on every page", "Google-ready setup: titles, descriptions, map and business details", "Launch on your own domain, with hosting set up for you", "Optional scroll-driven 3D experience"],
      benefits: ["Customers trust you before they walk in", "Enquiries arrive even when you are closed", "You look sharper than the competitor down the road"],
      idealFor: "Any local business with no website, or one that feels slow and dated.",
      from: { in: 12000, intl: 600 }
    },
    {
      id: "systems", img: "photo-1556742205-e10c9486e506", imgAlt: "Phone on a cafe table next to a menu", icon: "calendar", name: "Booking & Ordering Systems", outcome: "Let customers book and order on their own",
      summary: "Appointments, QR ordering, memberships and room enquiries that run without a phone call.",
      description: "Customers pick a slot, order from their table or join a membership without calling you. Each system is built for your kind of business, and every booking or order reaches you instantly.",
      includes: ["Appointment booking for salons, clinics, wellness and car studios", "QR menu with table and takeaway ordering for cafes and restaurants", "Membership sign-up and class booking for gyms", "Room enquiry and booking requests for hotels", "Instant confirmation to the customer and an alert to you"],
      benefits: ["Fewer phone calls during your busiest hours", "Bookings and orders keep coming after closing time", "Automatic reminders help reduce no-shows"],
      idealFor: "Businesses that take bookings or orders by phone or WhatsApp today.",
      from: { in: 25000, intl: 1200 }
    },
    {
      id: "automation", img: "photo-1592890288564-76628a30a657", imgAlt: "Person replying to a message on a phone", icon: "bolt", name: "Automation", outcome: "Never miss an enquiry",
      summary: "Workflows that reply, remind and follow up for you, every day, without being asked.",
      description: "A workflow does one job and never forgets it. A new enquiry gets an instant reply. A booking gets a confirmation and a reminder. A happy customer gets a review request. You choose the jobs, we build and connect them.",
      includes: ["Instant auto-reply to every new enquiry", "Booking confirmations and reminders", "Review request after each visit", "Lead alerts to your phone, saved to a sheet", "Follow-ups for customers who went quiet"],
      benefits: ["Every enquiry gets an answer in seconds", "Less of your day spent typing the same replies", "More reviews without the awkward ask"],
      idealFor: "Owners who lose enquiries because they cannot reply fast enough.",
      from: { in: 8000, intl: 450 }, unit: "per workflow"
    },
    {
      id: "gbp", img: "photo-1548345680-f5475ea5df84", imgAlt: "Hand holding a phone showing a map with a location pin", icon: "pin", name: "Google Business Profile + NFC Card", outcome: "Get found nearby",
      summary: "A complete, tuned Google profile, plus a tap-to-review NFC card delivered to your address.",
      description: "Your Google Business Profile is what people see when they search \"near me\". We complete and tune it so you show up with the right details, photos and services. Then we send you an NFC card: a customer taps it with their phone and lands straight on your review page.",
      includes: ["Full profile clean-up: categories, hours, services and description", "Photos, products or menu added", "Review link and ready-to-use reply templates", "NFC review card, physically delivered to your address in India", "A short guide to keeping your profile active"],
      benefits: ["Show up when locals search for what you sell", "Collect reviews with a single tap", "Correct details mean fewer lost visits"],
      idealFor: "Every local business. This is the quickest win on the list.",
      from: { in: 1999, intl: 210 }
    }
  ],

  /* ---------- How it works ---------- */
  steps: [
    { title: "Free audit", text: "We check your website and Google profile and show you where customers are being lost." },
    { title: "Plan and quote", text: "You get a clear plan and a fixed quote. No surprises later." },
    { title: "Build", text: "We build, you review. Revision rounds are included in every plan." },
    { title: "Launch and care", text: "We launch, show you how it works, and stay on with a Care plan if you want one." }
  ],
  delivery: "Starter website: 5 to 7 days · Business website: 10 to 14 days · 3D website: 3 to 4 weeks",

  /* ---------- Pricing ---------- */
  regions: {
    in: { label: "India", sub: "Prices in ₹" },
    intl: { label: "International", sub: "UK · US · Canada · UAE, prices in $" }
  },

  // Packages: shown on the home page and as the first tab on the pricing page.
  packages: [
    { id: "found", name: "Get Found", desc: "For a business with no real online presence.", price: { in: 13499, intl: 749 }, per: "/ project", cta: "Choose Get Found", includes: [
      "One-page website", "Custom design around your brand", "Mobile-responsive layout", "Free domain for 1 year", "Free hosting for 1 year", "Enquiry form with instant alert", "WhatsApp and social media links", "Google Business Profile setup", "NFC review card, delivered in India", "Basic SEO and speed optimisation", "2 revision rounds", "5 to 7 days delivery"
    ] },
    { id: "booked", name: "Get Booked", popular: true, desc: "For a business losing enquiries and bookings.", price: { in: 49999, intl: 2799 }, per: "/ project", cta: "Choose Get Booked", includes: [
      "Business website, up to 5 pages", "Premium custom design", "Mobile-responsive layout", "Free domain and hosting for 1 year", "One booking or ordering system", "One automation workflow", "Contact and lead forms", "WhatsApp and social media integration", "Google Business Profile setup", "NFC review card, delivered in India", "SEO setup and speed optimisation", "Google Analytics and Search Console", "3 revision rounds", "2 to 3 weeks delivery"
    ] },
    { id: "complete", name: "Complete Digital System", desc: "For a premium brand that wants to stand out.", price: { in: 79999, intl: 4299 }, per: "/ project", cta: "Choose Complete", includes: [
      "Signature 3D website", "Scroll-driven 3D hero built for your brand", "Premium animations and interactions", "Free domain and hosting for 1 year", "One booking or ordering system", "Automation Suite, 3 or more workflows", "Google Business Profile setup", "NFC review card, delivered in India", "Advanced SEO and speed optimisation", "Google Analytics and Search Console", "3 months of Care included", "5 revision rounds", "4 to 6 weeks delivery"
    ] }
  ],

  // Single services: one tab per group on the pricing page.
  pricing: [
    { id: "websites", label: "Websites", title: "Websites", blurb: "Fast, mobile-first websites built to turn visitors into enquiries.", plans: [
      { name: "Starter Website", desc: "A professional starting point for a business that needs a credible online presence.", price: { in: 12000, intl: 600 }, per: "/ project", cta: "Get Started", includes: [
        "One-page website", "Custom website design", "Mobile-responsive layout", "Free domain for 1 year", "Free hosting for 1 year", "Contact form with instant alert", "WhatsApp integration", "Social media integration", "Basic SEO setup", "Basic speed optimisation", "2 revision rounds", "5 to 7 days delivery"
      ] },
      { name: "Business Website", popular: true, desc: "A complete website that presents your services, attracts enquiries and converts visitors.", price: { in: 20000, intl: 1200 }, per: "/ project", cta: "Choose Business", includes: [
        "Up to 5 website pages", "Premium custom website design", "Mobile-responsive layout", "Free domain for 1 year", "Free hosting for 1 year", "Contact and lead forms", "WhatsApp and social media integration", "SEO setup and speed optimisation", "Google Analytics setup", "Google Search Console setup", "Google Maps and business details", "Conversion-focused design", "3 revision rounds", "10 to 14 days delivery"
      ] },
      { name: "Signature 3D Website", desc: "A scroll-animated 3D experience, like this site, for brands that want to stand out.", price: { in: 40000, intl: 2000 }, per: "/ project", cta: "Get Signature 3D", includes: [
        "Up to 5 website pages", "Scroll-driven 3D hero built for your brand", "Premium animations and interactions", "Custom interactive sections", "Lighter version for slower phones", "Mobile-responsive layout", "Free domain and hosting for 1 year", "Contact and lead forms", "WhatsApp integration", "Advanced SEO setup", "Advanced speed optimisation", "Google Analytics and Search Console", "5 revision rounds", "3 to 4 weeks delivery"
      ] }
    ] },
    { id: "systems", label: "Booking & Ordering", title: "Booking & Ordering Systems", blurb: "Customers book and order on their own. You get every one instantly.", plans: [
      { name: "Appointment Booking", desc: "For salons, clinics, wellness centres and car studios.", price: { in: 25000, intl: 1200 }, per: "/ project", cta: "Get Booking", includes: [
        "Online booking page with open slots", "Services, durations and prices listed", "Staff or bay selection", "Instant confirmation to the customer", "New booking alert to you", "Automatic reminders before each visit", "Reschedule and cancel links", "Bookings saved to a sheet", "Mobile-first design", "2 revision rounds", "Delivery date set in your quote"
      ] },
      { name: "Cafe & Restaurant QR Ordering", popular: true, desc: "A QR menu that takes table and takeaway orders.", price: { in: 30000, intl: 1200 }, per: "/ project", cta: "Get QR Ordering", includes: [
        "QR code for every table", "Digital menu with photos and categories", "Table and takeaway ordering", "Orders sent straight to WhatsApp", "New order alerts", "Easy menu and price edits", "Mark items as sold out", "Works on any phone, no app needed", "Mobile-first design", "2 revision rounds", "Delivery date set in your quote"
      ] },
      { name: "Gym Membership & Booking", desc: "Sign-ups, renewals, classes and free trials.", price: { in: 30000, intl: 1200 }, per: "/ project", cta: "Get Gym System", includes: [
        "Membership plans and online sign-up", "Free-trial booking", "Class timetable and booking", "Renewal reminders", "Follow-ups for trial enquiries", "New member alerts to you", "Member list saved to a sheet", "Mobile-first design", "2 revision rounds", "Delivery date set in your quote"
      ] },
      { name: "Hotel Enquiry & Room Booking", desc: "Direct room requests, without waiting for a call back.", price: { in: 35000, intl: 1200 }, per: "/ project", cta: "Get Hotel System", includes: [
        "Room pages with photos and amenities", "Booking request form with dates and guests", "Instant reply to every enquiry", "New request alert to you", "Event and group enquiry form", "Requests saved to a sheet", "Google Maps and directions", "Mobile-first design", "2 revision rounds", "Delivery date set in your quote"
      ] }
    ] },
    { id: "automation", label: "Automation", title: "Automation", blurb: "Workflows that reply, remind and follow up for you, every day.", plans: [
      { name: "Single Automation", desc: "One workflow that does one job and never forgets it.", price: { in: 8000, intl: 450 }, per: "/ workflow", cta: "Get One Workflow", includes: [
        "One workflow of your choice", "Instant auto-reply, reminder or review request", "Your wording, in your tone", "Lead alert to your phone", "Leads saved to a Google Sheet", "Tested before it goes live", "Short handover guide", "1 revision round"
      ] },
      { name: "Automation Suite", popular: true, desc: "Three or more workflows connected into one system.", price: { in: 20000, intl: 1200 }, per: "/ project", cta: "Get the Suite", includes: [
        "3 or more connected workflows", "Instant auto-reply to new enquiries", "Booking confirmations and reminders", "Review request after each visit", "Follow-ups for customers who went quiet", "Lead alerts to your phone", "Leads saved to a Google Sheet", "Tested before it goes live", "Short handover guide", "2 revision rounds"
      ] }
    ] },
    { id: "google", label: "Google Profile & Care", title: "Google Profile & Care", blurb: "Get found nearby, collect reviews with a tap, and keep everything running.", plans: [
      { name: "Google Business Profile + NFC Card", popular: true, fixed: true, desc: "A complete, tuned profile plus a tap-to-review card.", price: { in: 1999, intl: 210 }, per: "one-time", cta: "Get Found Nearby", includes: [
        "Profile claim and verification help", "Correct categories, hours and services", "Business description written for you", "Photos and products or menu added", "Review link set up", "Ready-to-use review reply templates", "NFC review card, delivered in India", "Short guide to keeping your profile active"
      ] },
      { name: "Care Plan", fixed: true, desc: "We keep your website and automations healthy every month.", price: { in: 1999, intl: 59 }, per: "/ month", cta: "Add Care", includes: [
        "Hosting looked after", "Small text and photo edits", "Uptime checks", "Automation checks", "Fixes if something breaks", "Cancel any time"
      ] }
    ] }
  ],

  priceNotes: [
    "Prices are starting prices. Your final quote depends on scope and is confirmed after your free audit.",
    "A domain and hosting are free for the first year where a plan lists them. WhatsApp platform fees, message charges and other third-party costs are billed at actual cost.",
    "Terms: 50% advance, 50% at launch."
  ],

  /* ---------- FAQ ---------- */
  faq: [
    { q: "How long does it take?", a: "A Starter website takes 5 to 7 days and a Business website 10 to 14 days. A 3D website takes 3 to 4 weeks. Systems and automations depend on scope, and you get a date with your quote." },
    { q: "What do you need from me?", a: "Your logo, photos, a list of services with prices, and your business details. If you do not have good photos or text, we will help you put them together." },
    { q: "Who owns the website?", a: "You do. After the final payment, the website, the domain and all the content are yours." },
    { q: "Are there monthly costs?", a: "Only if you choose a Care plan. Your domain and hosting are free for the first year where the plan lists them. WhatsApp message charges are billed at actual cost, with nothing added on top." },
    { q: "How do I pay?", a: "50% in advance to start and 50% at launch." },
    { q: "What happens after launch?", a: "We show you how everything works. With a Care plan we also handle hosting, small edits and regular checks, so nothing breaks quietly." },
    { q: "You are a new studio. Why should I trust you?", a: "Fair question. We will not show you invented reviews. This website is our first project, so judge us by it. The audit is free, and you only pay if the plan makes sense to you." }
  ]
};
