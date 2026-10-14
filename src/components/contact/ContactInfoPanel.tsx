import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { SITE, buildWhatsAppLink } from "@/lib/site";

const infoItems = [
  {
    icon: Phone,
    tone: "text-[#146C36]",
    label: "Call Us (24/7 Dispatch)",
    href: `tel:${SITE.phoneE164}`,
    value: SITE.phoneDisplay,
  },
  {
    icon: MessageSquare,
    tone: "text-[#25D366]",
    label: "WhatsApp Quick Booking",
    href: buildWhatsAppLink(`Hello ${SITE.name}, I'd like to enquire about a shuttle.`),
    external: true,
    value: "Chat with us on WhatsApp",
  },
  {
    icon: Mail,
    tone: "text-[#146C36]",
    label: "Email Inquiries",
    href: `mailto:${SITE.email}`,
    value: SITE.email,
  },
];

const plainItems = [
  {
    icon: MapPin,
    label: "Operational Headquarters & Hubs",
    value: "Centurion, Gauteng & Regional Routes",
  },
  {
    icon: Clock,
    label: "Operating Hours",
    value: "24 Hours / 7 Days a Week (Pre-booked rides)",
  },
];

export default function ContactInfoPanel() {
  return (
    <div className="bg-[#FAFDFB] rounded-3xl p-7 border border-emerald-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Direct Contact Information
      </h3>

      <div className="space-y-5">
        {infoItems.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div
              className={`w-10 h-10 rounded-xl bg-[#EAF7EE] ${item.tone} flex items-center justify-center flex-shrink-0`}
            >
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                {item.label}
              </p>
              <a
                href={item.href}
                {...(item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-sm sm:text-base font-bold text-gray-900 hover:text-[#146C36] transition-colors"
              >
                {item.value}
              </a>
            </div>
          </div>
        ))}

        {plainItems.map((item) => (
          <div key={item.label} className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#EAF7EE] text-[#146C36] flex items-center justify-center flex-shrink-0">
              <item.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold uppercase">
                {item.label}
              </p>
              <p className="text-sm font-bold text-gray-900">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
