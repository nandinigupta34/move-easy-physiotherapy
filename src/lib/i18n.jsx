import { createContext, useContext, useState } from "react";
// To add a language/word: add a key in BOTH objects below, then use t("key").
const D = {
  en: { home: "Home", about: "About", services: "Services", homevisit: "Home Physiotherapy", appointment: "Appointment", contact: "Contact",
    book: "Book Appointment", call: "Call Now", whatsapp: "WhatsApp", svc: "Physiotherapy Services", request: "REQUEST APPOINTMENT", hv: "Home Visit" },
  mr: { home: "मुख्यपृष्ठ", about: "आमच्याबद्दल", services: "सेवा", homevisit: "घरपोच फिजिओथेरपी", appointment: "अपॉइंटमेंट", contact: "संपर्क",
    book: "अपॉइंटमेंट बुक करा", call: "आत्ताच कॉल करा", whatsapp: "व्हॉट्सअ‍ॅप", svc: "फिजिओथेरपी सेवा", request: "अपॉइंटमेंट विनंती करा", hv: "घरपोच फिजिओथेरपी" },
};
const Ctx = createContext(null);
export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");
  const set = (l) => { setLang(l); localStorage.setItem("lang", l); document.documentElement.lang = l; };
  return <Ctx.Provider value={{ lang, set, t: (k) => D[lang][k] || D.en[k] || k }}>{children}</Ctx.Provider>;
}
export const useLang = () => useContext(Ctx);
