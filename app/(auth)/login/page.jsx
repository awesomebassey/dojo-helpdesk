"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import AuthForm from "../AuthForm";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();
    setLoading(true)
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false)
    if (error) {
      setError(error.message);
    } else {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <main>
      <h2 className="text-center">Log In</h2>
      {error && <div className="error">{error}</div>}
      <AuthForm handleSubmit={handleSubmit} loading={loading} />
    </main>
  );
}
