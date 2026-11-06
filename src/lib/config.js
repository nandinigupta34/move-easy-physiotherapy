// Change clinic details HERE (one place).
export const CLINIC = {
  name: "Move Easy Physiotherapy",
  phones: ["7823090589", "8329022382"],
  whatsapp: "917823090589", // 91 + number
  addressLines: ["Kaustubh, Sainagar,", "Satavwadi,", "Opp. to Glyding Center,", "Hadapsar, Pune – 411028"],
  mapQuery: "Kaustubh Sainagar Satavwadi Hadapsar Pune 411028",
};
export const wa = (text) => `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;
export const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(CLINIC.name + " " + CLINIC.mapQuery)}`;
export const GOOGLE_LINK = "https://share.google/LYPqAtxyXXwvXnvmw"; // clinic's Google location
export const INSTAGRAM = "https://www.instagram.com/moveeasy__physioclinic";
// Optional photo per category: public/images/services/<slug>.jpg. To add a service, add a line to items.
export const SERVICES = [
  { slug: "pain-ortho", icon: "🦴", title: "Pain & Orthopedic", imageAlt: "Physiotherapist checking a patient's knee", desc: "Physiotherapy support for muscle, bone and joint problems.", items: ["Pain Management", "Orthopedic Rehabilitation", "Back Pain", "Knee Pain / Osteoarthritis", "Frozen Shoulder", "Fracture Rehabilitation"] },
  { slug: "neuro", icon: "🧠", title: "Neuro Rehabilitation", imageAlt: "Older adult holding an exercise ball during rehabilitation", desc: "Rehabilitation to support movement, balance and daily activity.", items: ["Stroke / Paralysis Rehabilitation", "Parkinson's Rehabilitation", "Spinal Cord Injury Rehabilitation"] },
  { slug: "post-surgical", icon: "🏥", title: "Post-Surgical Rehabilitation", imageAlt: "Knee rehabilitation with electrical stimulation", desc: "Guided exercise and care before and after surgery.", items: ["Pre & Post Operative Rehabilitation", "Knee Replacement Rehabilitation", "Hip Replacement Rehabilitation"] },
  { slug: "sports-other", icon: "🏃", title: "Sports & Other", imageAlt: "Athlete training on outdoor steps", desc: "Rehabilitation for active people, older adults and specialised techniques.", items: ["Sports Rehabilitation", "Geriatric Physiotherapy", "Dry Needling", "Cupping Therapy"] },
];
