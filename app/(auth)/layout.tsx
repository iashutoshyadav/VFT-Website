// Auth pages (signup, login, forgot-password) — no navbar or footer
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
