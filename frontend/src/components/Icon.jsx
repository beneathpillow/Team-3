export default function Icon({ name, size = 28 }) {
  const paths = {
    arrow: <path d="m9 5 7 7-7 7M4 12h12" />,
    bandage: (
      <>
        <rect
          x="3"
          y="7"
          width="18"
          height="10"
          rx="4"
          transform="rotate(-40 12 12)"
        />
        <path d="m10 10 4 4m-7-1h.01M17 11h.01" />
      </>
    ),
    phone: (
      <path d="m5 3 4 1 1 5-3 2c2 3 3 4 6 6l2-3 5 1 1 4c-1 5-8 2-12-2S0 4 5 3Z" />
    ),
    help: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9S4 17 4 12V6Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    burn: (
      <path d="M12 2c1 6-5 7-5 12 0 2 1 3 2 4-1-4 4-4 4-7 4 4 4 6 2 9 8-2 6-11 2-14 0 3-1 4-2 4 1-4-1-6-3-8Z" />
    ),
    drop: <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />,
    head: (
      <path d="M8 21v-5C0 10 7 0 15 4c4 2 3 5 6 8h-4v5h-4v4M8 8h4m-2-2v4" />
    ),
    bone: (
      <path d="M8 5c0-4-6-3-5 1-3 3 1 6 3 4l8 8c-2 3 2 6 4 3 4 1 5-5 1-5L10 7c1-3-1-4-2-2Z" />
    ),
    air: (
      <>
        <path d="M3 8h12a3 3 0 1 0-3-3M3 12h16a3 3 0 1 1-3 3M3 16h6" />
      </>
    ),
    snow: (
      <>
        <path d="M12 2v20M3 7l18 10M3 17 21 7m-12-3 3 3 3-3m-6 16 3-3 3 3" />
      </>
    ),
    bottle: (
      <>
        <path d="M9 3h6M10 3v5l-5 9v4h14v-4l-5-9V3M7 16h10" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name] || paths.help}
    </svg>
  );
}
