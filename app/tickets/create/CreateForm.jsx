"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [priority, setPriority] = useState("low");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:4000/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
        priority,
        user_email: "awesome@netninja.dev",
      }),
    });

    if (res.status === 201) {
      router.refresh();
      router.push("/tickets");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-1/2">
        <label>
          <span>Title:</span>
          <input
            required
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>Body:</span>
          <textarea
            required
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Priority:</span>
          <select
            onChange={(e) => setPriority(e.target.value)}
            value={priority}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </label>
        <button className="btn-primary" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Ticket"}
        </button>
      </form>
    </>
  );
}
