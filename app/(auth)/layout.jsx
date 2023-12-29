import Link from "next/link";

export default function AuthLayout({ children }) {
  return (
    <>
      <nav>
        <Link href={"/"}><h1>Dojo Helpdesk</h1></Link>
        <Link href={"/signup"}>Sign Up</Link>
        <Link href={"/login"}>Log In</Link>
      </nav>
      {children}
    </>
  );
}
