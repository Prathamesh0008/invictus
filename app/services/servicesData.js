export const services = [
  {
    slug: "road-freight",
    title: "Road Freight",
    label: "Domestic & Cross Border",
    image: "/Road_fright.jpg",
    description:
      "Reliable road transport for local, national and international shipments with real-time tracking.",
    points: [
      "FTL & LTL transport",
      "Express delivery",
      "Temperature-controlled trucks",
    ],
    details: [
      {
        title: "Door-to-door road freight for local, national, and cross-border delivery.",
        points: ["Pickup and delivery coordination", "Local and long-distance coverage", "Single-contact shipment handling"],
      },
      {
        title: "Full Truck Load and Less Than Truck Load options based on cargo size.",
        points: ["FTL for dedicated truck capacity", "LTL for smaller cargo loads", "Flexible costing based on shipment size"],
      },
      {
        title: "Route planning support for faster delivery and better cost control.",
        points: ["Optimized routes", "Reduced avoidable delays", "Better fuel and transit cost control"],
      },
      {
        title: "Live shipment updates with coordinated pickup and delivery scheduling.",
        points: ["Real-time status communication", "Pickup and delivery time planning", "Better visibility for your team"],
      },
      {
        title: "Suitable for retail, industrial, e-commerce, and urgent cargo movement.",
        points: ["Supports repeated business shipments", "Handles urgent dispatches", "Works for multiple cargo categories"],
      },
    ],
  },
  {
    slug: "air-freight",
    title: "Air Freight",
    label: "Fast Global Cargo",
    image: "/Air_filite.jpg",
    description:
      "Fast air cargo solutions for urgent and time-sensitive shipments across global destinations.",
    points: ["Same-day service", "Next flight out", "Customs support"],
    details: [
      {
        title: "Priority air cargo handling for urgent and time-sensitive shipments.",
        points: ["Faster booking support", "Priority movement options", "Ideal for deadline cargo"],
      },
      {
        title: "Airport-to-airport and door-to-door air freight coordination.",
        points: ["Flexible pickup options", "Airport cargo handling", "Final delivery coordination"],
      },
      {
        title: "Documentation and customs support for smoother international movement.",
        points: ["Export paperwork support", "Import clearance coordination", "Reduced documentation delays"],
      },
      {
        title: "Shipment visibility from booking through arrival and release.",
        points: ["Booking confirmation", "Transit status updates", "Arrival and release tracking"],
      },
      {
        title: "Best for high-value, lightweight, medical, and deadline-critical cargo.",
        points: ["Secure handling", "Fast transit time", "Suitable for sensitive goods"],
      },
    ],
  },
  {
    slug: "ocean-freight",
    title: "Ocean Freight",
    label: "Worldwide Sea Shipping",
    image: "/Ocean_Freight.jpg",
    description:
      "Cost-effective sea freight services for bulk cargo, container shipping and global trade.",
    points: ["FCL containers", "LCL consolidation", "Port-to-port service"],
    details: [
      {
        title: "Full Container Load and Less Container Load services for global shipping.",
        points: ["FCL for dedicated containers", "LCL for shared container movement", "Flexible sea freight planning"],
      },
      {
        title: "Port-to-port and door-to-door coordination through trusted partners.",
        points: ["Origin port handling", "Destination port coordination", "Optional inland delivery"],
      },
      {
        title: "Cargo consolidation options to reduce cost for smaller shipments.",
        points: ["Shared container space", "Lower shipping cost", "Better planning for smaller volumes"],
      },
      {
        title: "Export and import documentation assistance for smoother trade flow.",
        points: ["Bill of lading support", "Customs paperwork guidance", "Shipment compliance coordination"],
      },
      {
        title: "Ideal for bulk cargo, containerized goods, and planned international freight.",
        points: ["Best for larger shipments", "Reliable scheduled movement", "Cost-effective global transport"],
      },
    ],
  },
  {
    slug: "warehousing",
    title: "Warehousing",
    label: "Storage & Fulfillment",
    image: "/Warehouse.jpg",
    description:
      "Secure warehousing solutions with inventory management, pick-pack and distribution support.",
    points: ["Inventory control", "Pick & pack", "24/7 secure storage"],
    details: [
      {
        title: "Short-term and long-term storage options for different cargo categories.",
        points: ["Flexible storage duration", "Organized cargo placement", "Suitable for seasonal stock"],
      },
      {
        title: "Inventory management support with organized stock visibility.",
        points: ["Stock count visibility", "Inventory movement tracking", "Better warehouse control"],
      },
      {
        title: "Pick, pack, labeling, and dispatch preparation for order fulfillment.",
        points: ["Order preparation", "Packaging support", "Dispatch-ready shipments"],
      },
      {
        title: "Secure facilities designed for safe storage and controlled handling.",
        points: ["Controlled access", "Careful cargo handling", "Safe goods management"],
      },
      {
        title: "Useful for importers, retailers, distributors, and e-commerce businesses.",
        points: ["Supports distribution flow", "Good for online orders", "Helps manage stock near customers"],
      },
    ],
  },
  {
    slug: "supply-chain",
    title: "Supply Chain",
    label: "End-to-End Logistics",
    image: "/Supplay_Chain.jpg",
    description:
      "Complete supply chain planning and management to improve delivery speed and reduce cost.",
    points: ["Order fulfillment", "Vendor coordination", "Performance tracking"],
    details: [
      {
        title: "End-to-end coordination from supplier pickup to final delivery.",
        points: ["Supplier pickup planning", "Transport coordination", "Final delivery management"],
      },
      {
        title: "Vendor, carrier, warehouse, and customer communication in one workflow.",
        points: ["Centralized coordination", "Clear status communication", "Fewer handoff issues"],
      },
      {
        title: "Planning support to reduce delays, avoid duplicated movement, and control cost.",
        points: ["Smarter shipment planning", "Lower operational waste", "Better cost visibility"],
      },
      {
        title: "Performance tracking for delivery timelines and shipment reliability.",
        points: ["Delivery performance checks", "Transit-time visibility", "Service reliability insights"],
      },
      {
        title: "Designed for businesses that need predictable logistics operations.",
        points: ["Repeat shipment support", "Consistent process flow", "Useful for growing operations"],
      },
    ],
  },
  {
    slug: "cold-chain",
    title: "Cold Chain",
    label: "Temperature Controlled",
    image: "/Cold_Chain1.jpg",
    description:
      "Specialized cold chain logistics for pharmaceuticals, food and temperature-sensitive goods.",
    points: ["Cold storage", "Real-time monitoring", "GDP compliance"],
    details: [
      {
        title: "Temperature-controlled handling for sensitive food, pharma, and healthcare cargo.",
        points: ["Chilled and frozen movement", "Product-specific handling", "Temperature-sensitive cargo care"],
      },
      {
        title: "Cold storage and cold transport coordination based on product requirements.",
        points: ["Cold room coordination", "Refrigerated transport support", "Planned handoff between storage and transport"],
      },
      {
        title: "Monitoring support to protect product quality during transit.",
        points: ["Temperature status updates", "Transit condition visibility", "Quality protection during movement"],
      },
      {
        title: "Special handling processes for fragile and regulated shipments.",
        points: ["Careful loading and unloading", "Regulated cargo handling", "Reduced risk during transit"],
      },
      {
        title: "Best for chilled, frozen, pharmaceutical, and temperature-sensitive products.",
        points: ["Food logistics", "Healthcare shipments", "Sensitive product distribution"],
      },
    ],
  },
];

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}
