export default function CallSticky() {
  return (
    <a
      href="tel:+31685865799"
      aria-label="Call us"
      className="fixed bottom-28 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-orange-600 text-white shadow-lg hover:bg-blue-700"
    >
      {/* Simple phone icon (no extra library needed) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
      >
        <path d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 0 0 2.25-2.25v-1.372a1.5 1.5 0 0 0-1.097-1.447l-3.178-.907a1.5 1.5 0 0 0-1.69.7l-.73 1.218a12.06 12.06 0 0 1-5.318-5.318l1.218-.73a1.5 1.5 0 0 0 .7-1.69l-.907-3.178A1.5 1.5 0 0 0 6.622 3H5.25A3 3 0 0 0 2.25 6.75Z" />
      </svg>
    </a>
  );
}
