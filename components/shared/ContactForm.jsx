"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState = { name: "", phone: "", email: "", message: "" };

export function ContactForm({ className }) {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  function handleChange(field) {
    return (event) => setValues((v) => ({ ...v, [field]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitting");
    // TODO: wire to /api/contact once the CRM backend is available.
    await new Promise((resolve) => setTimeout(resolve, 700));
    setStatus("success");
    setValues(initialState);
  }

  if (status === "success") {
    return (
      <div
        className={`card-surface flex flex-col items-center gap-3 p-10 text-center ${className ?? ""}`}
      >
        <CheckCircle2 className="size-10 text-status-success" strokeWidth={1.5} />
        <h3 className="font-display text-xl text-ink">Message sent</h3>
        <p className="text-sm text-ink-muted">
          A member of the Luxora team will be in touch shortly.
        </p>
        <Button variant="secondary" size="sm" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`card-surface flex flex-col gap-5 p-8 ${className ?? ""}`}>
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          required
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Full name"
          className="h-12 rounded-md border-line bg-canvas px-4"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange("phone")}
          placeholder="+1 (000) 000-0000"
          className="h-12 rounded-md border-line bg-canvas px-4"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          required
          value={values.email}
          onChange={handleChange("email")}
          placeholder="you@example.com"
          className="h-12 rounded-md border-line bg-canvas px-4"
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={handleChange("message")}
          placeholder="Tell us what you're looking for…"
          className="rounded-md border-line bg-canvas px-4 py-3"
        />
      </div>
      <Button type="submit" variant="primary" size="lg" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
