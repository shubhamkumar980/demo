/* =============================================================================
   Punjab Ki Rasoi — site configuration
   -----------------------------------------------------------------------------
   Everything that changes from time to time lives here. Edit values, save,
   refresh. No build step.

   The phone number and address are ALSO written in index.html (so they work
   without JavaScript and are indexed by Google). If you change them here,
   search index.html for the old value and update it there too.
   ========================================================================== */
window.PKR = {
  name: "Punjab Ki Rasoi",

  phone: "+91 99014 77409",
  phoneHref: "tel:+919901477409",

  // Optional. Set to e.g. "https://wa.me/919901477409" once the WhatsApp
  // number is confirmed. Leave empty to hide the WhatsApp option.
  whatsapp: "",

  // Google Maps — real place listing (12.8477731, 77.6578766)
  maps: {
    place: "https://www.google.com/maps/place/Punjab+ki+Rasoi/@12.8477731,77.6578766,17z",
    directions: "https://www.google.com/maps/dir/?api=1&destination=Punjab+Ki+Rasoi,+Velankani+Road,+Electronic+City+Phase+I,+Bengaluru,+Karnataka+560100",
    embed: "https://www.google.com/maps?q=12.8477731,77.6578766&z=17&output=embed"
  },

  // Daily hours, 24h clock, Indian Standard Time. Used for the live
  // "Open now" indicator only — the printed hours live in index.html.
  hours: { open: "10:00", close: "23:30" },

  // Ordering.
  //   primary   — if you have ONE preferred ordering link (own ordering page,
  //               Swiggy, Zomato…), put it here and every "Order" button on the
  //               site will go straight to it.
  //   platforms — otherwise, leave `primary` empty and the "Order" buttons open
  //               a small sheet listing these options plus "Call to order".
  //               URLs below come from the restaurant's public listings —
  //               confirm they are the restaurant's own before launch.
  order: {
    primary: "",
    platforms: [
      { name: "Zomato",   note: "Delivery & takeaway", url: "https://www.zomato.com/bangalore/punjab-ki-rasoi-electronic-city-bangalore" },
      { name: "magicpin", note: "Delivery & offers",   url: "https://magicpin.in/Bangalore/Electronics-City-Phase-1/Restaurant/Punjab-Ki-Rasoi/store/381ca3/" }
      // { name: "Swiggy", note: "Delivery", url: "" }   ← add when the link is known
    ]
  },


  // Social accounts. Icons appear in the footer only for the ones filled in.
  social: {
    instagram: "",
    facebook: "",
    youtube: ""
  }
};
