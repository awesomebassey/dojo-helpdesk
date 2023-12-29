import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import DeleteButton from "./DeleteButton";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket } = await supabase
    .from("tickets")
    .select()
    .eq("id", params.id)
    .single();
  return {
    title: `Dojo Helpdesk | ${ticket?.title || "Ticket not found!"}`,
  };
}

async function getTicket(id) {
  const supabase = createServerComponentClient({ cookies });
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    notFound();
  }
  return ticket;
}

export default async function TicketDetails({ params }) {
  const ticket = await getTicket(params.id);
  const supabase = createServerComponentClient({ cookies });
  const {
    data: {
      session: { user },
    },
  } = await supabase.auth.getSession();

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
        {user.email === ticket.user_email && (
          <div className="ml-auto">
            <DeleteButton id={ticket.id} />
          </div>
        )}
      </nav>
      <div className="card">
        <h3>{ticket.title}</h3>
        <small>Created by {ticket.user_email}</small>
        <p>{ticket.body}</p>
        <div className={`pill ${ticket.priority}`}>
          {ticket.priority} priority
        </div>
      </div>
    </main>
  );
}
