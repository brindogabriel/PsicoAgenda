const ApplicationLogo = ({ ...props }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-accent-foreground"
    {...props}>
    <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12" />
    <path d="M12 2c-2.76 0-5 4.48-5 10s2.24 10 5 10" />
    <path d="M2 12h10" />
  </svg>
)

export default ApplicationLogo
