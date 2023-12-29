"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = supabase.auth.signOut();

    if (error) {
      console.log(error);
    } else {
      router.refresh();
      router.push("/login");
    }
  };
  return (
    <>
      <button className="btn-primary" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}
