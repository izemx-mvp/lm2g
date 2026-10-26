import { MessageCircle } from "lucide-react";
import { waLink, whatsappDefaultMessage } from "@/config/site";

export function WhatsAppButton() {
  return (
    <a
      href={waLink(whatsappDefaultMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <MessageCircle className="size-7" aria-hidden />
      <span className="sr-only">Nous écrire sur WhatsApp : {whatsappDefaultMessage}</span>
    </a>
  );
}
