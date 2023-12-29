"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TiDelete } from "react-icons/ti";

export default function DeleteButton({ id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClick = async () => {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: "DELETE",
    });
    const { error } = await res.json();
    if (error) {
      console.log(error);
      setLoading(false);
    } else {
      router.refresh();
      router.push("/tickets");
    }
  };
  return (
    <>
      <button className="btn-primary" onClick={handleClick} disabled={loading}>
        <TiDelete />
        {loading ? " Deleting..." : " Delete Ticket"}
      </button>
    </>
  );
}
