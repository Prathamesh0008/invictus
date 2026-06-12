import Image from "next/image";
import {
  FaBoxOpen,
  FaClipboardCheck,
  FaCookieBite,
  FaDatabase,
  FaEnvelopeOpenText,
  FaFileSignature,
  FaLock,
  FaRoute,
  FaShareAlt,
  FaShieldAlt,
  FaTruckMoving,
  FaUserCheck,
} from "react-icons/fa";

const relatedQuestions = [
  "Your privacy",
  "Information we collect",
  "Shipment and tracking data",
  "How we use your data",
  "Sharing information",
  "Cookies and website usage",
  "Your privacy rights",
  "Data security",
  "Policy changes and contact",
];

const privacyHighlights = [
  {
    icon: FaShieldAlt,
    title: "Protected Data",
    text: "We use your information only for service, support, compliance, and communication.",
  },
  {
    icon: FaTruckMoving,
    title: "Shipment Visibility",
    text: "Tracking data is handled to coordinate movement and keep cargo status clear.",
  },
  {
    icon: FaUserCheck,
    title: "Customer Control",
    text: "You can request access, correction, or deletion where legally permitted.",
  },
];

const policySections = [
  {
    icon: FaShieldAlt,
    title: "Your Privacy",
    body: "At Invictus Logistics, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, store, and protect your information when you use our website, request a quotation, book a shipment, track a consignment, or contact our support team.",
    points: [
      "We do not sell your personal information.",
      "We collect information only for legitimate logistics and business purposes.",
      "We handle customer, sender, receiver, and shipment information with care.",
    ],
  },
  {
    icon: FaDatabase,
    title: "Information We Collect",
    body: "We may collect information that helps us quote, plan, move, track, and support your shipment. This can include details submitted through website forms, emails, phone calls, WhatsApp messages, booking requests, and tracking inquiries.",
    points: [
      "Name, company name, phone number, email address, and contact preferences.",
      "Pickup address, delivery address, sender details, and receiver details.",
      "Cargo description, package type, weight, dimensions, service type, and handling needs.",
      "Billing details, quote details, booking references, and customer messages.",
    ],
  },
  {
    icon: FaRoute,
    title: "Shipment And Tracking Data",
    body: "When you book or track a shipment, we may process shipment-related information so we can coordinate transport, provide delivery updates, and maintain transparent shipment visibility.",
    points: [
      "Tracking numbers, route updates, pickup status, delivery status, and estimated delivery times.",
      "Carrier updates, warehouse checkpoints, dispatch notes, and proof of delivery where available.",
      "Customs, documentation, inspection, or delay information when relevant to the shipment.",
    ],
  },
  {
    icon: FaClipboardCheck,
    title: "How We Use Your Information",
    body: "Your information is used to provide and improve our logistics services, respond to requests, prepare quotations, arrange pickups and deliveries, and keep accurate operational records.",
    points: [
      "To prepare freight quotes and recommend suitable transport options.",
      "To arrange pickup, transport, warehousing, delivery, and customer updates.",
      "To respond to support requests, tracking questions, complaints, and service inquiries.",
      "To improve website performance, service quality, internal processes, and customer experience.",
    ],
  },
  {
    icon: FaShareAlt,
    title: "Sharing Your Personal Information",
    body: "We may share necessary information with trusted logistics partners only when required to complete services or meet legal, customs, safety, accounting, or operational requirements.",
    points: [
      "Transport providers, courier networks, carriers, warehouse teams, and delivery partners.",
      "Customs brokers, customs authorities, inspection bodies, or compliance service providers.",
      "Payment processors, IT providers, email providers, analytics tools, and professional advisors.",
      "Government authorities or legal parties when disclosure is required by law.",
    ],
  },
  {
    icon: FaCookieBite,
    title: "Cookies And Website Usage",
    body: "Our website may use cookies and similar technologies to improve browsing experience, measure website performance, understand visitor behavior, and support security features.",
    points: [
      "Essential cookies may support website functionality and form performance.",
      "Analytics cookies may help us understand pages visited and improve website content.",
      "You can control or disable cookies through your browser settings.",
    ],
  },
  {
    icon: FaLock,
    title: "Data Security And Storage",
    body: "We use reasonable technical and organizational measures to protect information from unauthorized access, loss, misuse, alteration, or disclosure. No online system can be guaranteed completely secure, so we encourage users to share information carefully.",
    points: [
      "Access is limited to people and service partners who need the information for work purposes.",
      "Operational records may be stored for business, legal, tax, customs, or dispute-resolution needs.",
      "We review our handling practices as our services and technology change.",
    ],
  },
  {
    icon: FaUserCheck,
    title: "Your Privacy Rights",
    body: "You may contact us to request access, correction, update, or deletion of your personal information. Some records may need to be retained where required for legal, tax, customs, accounting, dispute resolution, fraud prevention, or operational purposes.",
    points: [
      "Request a copy of personal information we hold about you.",
      "Ask us to correct incomplete or inaccurate details.",
      "Request deletion where retention is not legally or operationally required.",
      "Ask questions about how your data is used for logistics services.",
    ],
  },
  {
    icon: FaFileSignature,
    title: "Policy Changes",
    body: "We may update this Privacy Policy from time to time to reflect changes in our services, website, legal requirements, carrier processes, or business practices. The updated version will be posted on this page.",
    points: [
      "Changes apply from the date they are published on this page.",
      "Please review this page periodically for the latest privacy information.",
      "Continued use of our website or services means you accept the updated policy.",
    ],
  },
  {
    icon: FaEnvelopeOpenText,
    title: "Contact Us",
    body: "For privacy-related questions, data requests, correction requests, deletion requests, or policy concerns, please contact our support team through the contact page of our website or email us directly.",
    points: [
      "Email: info@invictuslogi.com",
      "Phone: +31685865799",
      "Address: Leyweg 836, 2545GR 's-Gravenhage, Netherlands",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-[#1f2933]">
      {/* Banner */}
      <section className="relative h-[260px] overflow-hidden bg-[#12333B] sm:h-[340px]">
        <Image
          src="/Terms.jpg"
          alt="Logistics privacy policy banner"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
              Logistics Policy
            </p>
            <h1 className="text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-5xl">
              Privacy Policy
            </h1>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto mt-10 grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-3">
        {privacyHighlights.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="bg-white p-6 shadow-[0_18px_45px_rgba(18,51,59,0.12)] ring-1 ring-gray-100"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[#E65100]/10 text-xl text-[#E65100]">
                  <Icon aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-bold text-[#12333B]">{item.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {item.text}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* Content */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[320px_1fr] lg:py-20">
        {/* Sidebar */}
        <aside className="h-fit bg-[#F6F8FA] p-6 shadow-sm ring-1 ring-gray-100 lg:sticky lg:top-24">
          <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.12em] text-[#12333B]">
            Related Questions
          </h2>

          <ul className="space-y-4">
            {relatedQuestions.map((item) => (
              <li
                key={item}
                className="border-b border-gray-200 pb-3 text-sm leading-6 text-gray-600 last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-l-4 border-[#E65100] bg-white p-4">
            <div className="mb-3 flex items-center gap-3 text-[#12333B]">
              <FaBoxOpen className="text-[#E65100]" aria-hidden="true" />
              <p className="text-sm font-bold">Logistics Notice</p>
            </div>
            <p className="text-sm leading-6 text-gray-600">
              Shipment and receiver data may be needed to complete transport,
              customs, delivery, and proof-of-delivery processes.
            </p>
          </div>
        </aside>

        {/* Main Text */}
        <article className="space-y-6 text-sm leading-7 text-gray-600">
          {policySections.map((section) => {
            const Icon = section.icon;

            return (
              <section
                key={section.title}
                className="border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-[#12333B] text-white">
                    <Icon aria-hidden="true" />
                  </div>
                  <h2 className="text-base font-bold uppercase tracking-[0.08em] text-[#12333B]">
                    {section.title}
                  </h2>
                </div>

                <p>{section.body}</p>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {section.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 rounded-md bg-[#F6F8FA] p-4 text-sm leading-6 text-gray-700"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#E65100]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </article>
      </section>
    </main>
  );
}
