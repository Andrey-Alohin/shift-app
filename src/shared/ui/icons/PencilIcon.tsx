export function PencilIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M7 42H43"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11 26.7199V34H18.3172L39 13.3081L31.6951 6L11 26.7199Z"
        fill="#2F88FF"
        fillOpacity={0.18}
        stroke="currentColor"
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  );
}
