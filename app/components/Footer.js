'use client'

import Image from 'next/image'
import Link from 'next/link'

import { FaEnvelope, FaHeadset, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'

export default function Footer() {
  const quickLinks = [
    { title: 'Home', href: '/' },
    { title: 'Services', href: '/services' },
    { title: 'Tracking', href: '/tracking' },
    { title: 'About Us', href: '/about' },
    { title: 'Contact', href: '/contact' },
    { title: 'Careers', href: '/careers' },
  ]

  const serviceLinks = [
    { title: 'Air Freight', href: '/services/air-freight' },
    { title: 'Ocean Freight', href: '/services/ocean-freight' },
    { title: 'Road Freight', href: '/services/road-freight' },
    { title: 'Warehousing', href: '/services/warehousing' },
    { title: 'Supply Chain', href: '/services/supply-chain' },
    { title: 'Cold Chain', href: '/services/cold-chain' },
  ]

  const contacts = [
    {
      icon: FaMapMarkerAlt,
      label: 'Leyweg 836, 2545GR',
      detail: "'s-Gravenhage",
      href: 'https://www.google.com/maps/search/?api=1&query=Leyweg%20836%202545GR%20s-Gravenhage',
    },
    {
      icon: FaPhone,
      label: '+31685865799',
      detail: 'Call anytime',
      href: 'tel:+31685865799',
    },
    {
      icon: FaEnvelope,
      label: 'info@invictuslogi.com',
      detail: 'Email support',
      href: 'mailto:info@invictuslogi.com',
    },
  ]
  const legalLinks = [
    { title: 'Privacy Policy', href: '/privacy-policy' },
    { title: 'Terms of Service', href: '/terms-and-conditions' },
    // { title: 'Cookie Policy', href: '#' },
    // { title: 'Sitemap', href: '/sitemap.xml' },
  ]

  return (
    <footer className="bg-[#071120] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1.1fr]">
          <div>
            <Link href="/" className="inline-flex">
              <span className="relative block h-45 w-65 overflow-hidden">
                <Image
                  src="/logo/Logoinv.png"
                  alt="Invictus Logi"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </span>
            </Link>

            <p className="mt-5 max-w-md text-base leading-8 text-white/68">
              Practical freight planning, customs support, warehousing, and
              delivery coordination for cargo that needs clear handling from
              pickup to final destination.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-md border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75">
              <FaHeadset className="text-[#FFD700]" aria-hidden="true" />
              24/7 Customer Support
            </div>
          </div>

          <FooterLinks title="Company" links={quickLinks} />
          <FooterLinks title="Services" links={serviceLinks} />

          <div>
            <h3 className="text-base font-bold uppercase tracking-[0.18em] text-white">
              Contact
            </h3>

            <div className="mt-6 space-y-4">
              {contacts.map((item) => {
                const Icon = item.icon

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex min-w-0 gap-4 rounded-md border border-white/10 bg-white/[0.03] p-4 transition hover:border-[#FFD700]/45 hover:bg-white/[0.06]"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E65100]/15 text-[#FFD700]">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block break-words text-sm font-bold text-white">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm text-white/55">
                        {item.detail}
                      </span>
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-7 text-sm text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; 2024 Invictus Logistics. All rights reserved.</p>

          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {legalLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="transition hover:text-[#FFD700]"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLinks({ title, links }) {
  return (
    <nav aria-label={title}>
      <h3 className="text-base font-bold uppercase tracking-[0.18em] text-white">
        {title}
      </h3>
      <ul className="mt-6 space-y-3">
        {links.map((link) => (
          <li key={link.title}>
            <Link
              href={link.href}
              className="inline-flex text-sm font-medium text-white/62 transition hover:text-[#FFD700]"
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

