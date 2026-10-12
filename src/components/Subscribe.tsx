"use client";

import { useState, type FormEvent } from "react";
import { CaretDown, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react";
import { contact, products, tel } from "@/content/site";
import { buttonStyles } from "./ui";

const field =
  "h-12 w-full rounded-[14px] bg-pasture-ink/10 px-4 text-pasture-ink ring-1 ring-inset ring-pasture-ink/25 placeholder:text-pasture-ink/60 focus:outline-none focus:ring-2 focus:ring-accent";
const label = "text-sm font-medium text-pasture-ink";

export function Subscribe() {
  const [error, setError] = useState("");

  // No backend: the form composes an email to the farm with the order details.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const phone = String(data.get("phone") || "").trim();
    if (!/^[+\d][\d\s-]{8,}$/.test(phone)) {
      setError("Please enter a valid phone number so we can confirm your delivery.");
      return;
    }
    setError("");
    const body = [
      `Name: ${data.get("name")}`,
      `Phone: ${phone}`,
      `Area in Bengaluru: ${data.get("area")}`,
      `Product: ${data.get("product")}`,
      `Notes: ${data.get("notes") || "-"}`,
    ].join("\n");
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent("New subscription request")}&body=${encodeURIComponent(body)}`;
  }

  return (
    <section id="subscribe" className="mx-auto max-w-[1400px] px-4 pb-24 sm:px-6 md:pb-32 lg:px-10">
      <div className="grid gap-12 overflow-hidden rounded-[28px] bg-pasture p-7 text-pasture-ink sm:p-10 md:grid-cols-12 md:gap-10 lg:p-14">
        <div className="md:col-span-5">
          <h2 className="max-w-[14ch] text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-5xl">
            Start your morning delivery
          </h2>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-pasture-ink/80">
            Milk subscriptions start from ₹252 a month. Tell us where you are and we will confirm your slot.
          </p>
          <ul className="mt-10 grid gap-4 text-[15px]">
            {contact.phones.map((p) => (
              <li key={p}>
                <a href={tel(p)} className="inline-flex items-center gap-3 hover:underline">
                  <Phone size={20} weight="duotone" className="text-accent" /> {p}
                </a>
              </li>
            ))}
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-3 hover:underline">
                <EnvelopeSimple size={20} weight="duotone" className="text-accent" /> {contact.email}
              </a>
            </li>
            <li>
              <a href={contact.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-start gap-3 hover:underline">
                <MapPin size={20} weight="duotone" className="mt-0.5 shrink-0 text-accent" />
                <span>
                  {contact.address[0]}
                  <br />
                  {contact.address[1]}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} noValidate className="grid gap-5 self-start sm:grid-cols-2 md:col-span-7">
          <div className="grid gap-2">
            <label htmlFor="name" className={label}>Name</label>
            <input id="name" name="name" required autoComplete="name" className={field} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone" className={label}>Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={!!error}
              aria-describedby="phone-error"
              className={field}
            />
            <p id="phone-error" role="alert" className="min-h-0 text-sm text-accent empty:hidden">{error}</p>
          </div>
          <div className="grid gap-2">
            <label htmlFor="area" className={label}>Area in Bengaluru</label>
            <input id="area" name="area" autoComplete="address-level3" className={field} />
          </div>
          <div className="grid gap-2">
            <label htmlFor="product" className={label}>Product</label>
            <div className="relative">
              <select id="product" name="product" className={`${field} appearance-none pr-10`} defaultValue={products[0].name}>
                {products.map((p) => (
                  <option key={p.id} value={p.name} className="bg-surface text-ink">{p.name}</option>
                ))}
              </select>
              <CaretDown aria-hidden size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="grid gap-2 sm:col-span-2">
            <label htmlFor="notes" className={label}>Quantity and notes</label>
            <textarea id="notes" name="notes" rows={3} className={`${field} h-auto py-3`} />
            <p className="text-sm text-pasture-ink/70">For example: 1 litre daily, starting Monday.</p>
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className={buttonStyles.primary}>Subscribe</button>
          </div>
        </form>
      </div>
    </section>
  );
}
