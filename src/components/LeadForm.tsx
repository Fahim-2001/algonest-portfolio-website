"use client";

import { useRef, useState } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { site } from "@/content/site";

type FieldDef = {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "select";
  required?: boolean;
  autoComplete?: string;
  options?: string[];
  half?: boolean;
};

const FORMS: Record<"contact" | "team", { subject: string; submit: string; fields: FieldDef[] }> = {
  contact: {
    subject: "Website enquiry",
    submit: "Send message",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name", half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name", half: true },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "subject", label: "Subject", type: "text" },
      { name: "message", label: "Comment or message", type: "textarea" },
    ],
  },
  team: {
    subject: "Technical team requirements",
    submit: "Send requirements",
    fields: [
      { name: "firstName", label: "First name", type: "text", required: true, autoComplete: "given-name", half: true },
      { name: "lastName", label: "Last name", type: "text", required: true, autoComplete: "family-name", half: true },
      { name: "company", label: "Company name", type: "text", autoComplete: "organization" },
      { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
      { name: "project", label: "Tell us about your business or project", type: "textarea" },
      { name: "teamSize", label: "How many people do you need?", type: "select", options: ["One", "3-4", "5-7", "8-10", "10+"] },
      { name: "notes", label: "Anything else we should know?", type: "textarea" },
    ],
  },
};

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(field: FieldDef, value: string) {
  const v = value.trim();
  if (field.required && !v) return `Enter your ${field.label.toLowerCase()}.`;
  if (field.type === "email" && v && !EMAIL_RE.test(v)) return "Enter an email address like name@company.com.";
  return "";
}

export function LeadForm({ variant }: { variant: "contact" | "team" }) {
  const def = FORMS[variant];
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "drafted" | "failed">("idle");

  function setError(name: string, message: string) {
    setErrors((prev) => (prev[name] === message ? prev : { ...prev, [name]: message }));
  }

  function shake(names: string[]) {
    for (const name of names) {
      const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${name}"]`);
      if (!el) continue;
      el.classList.remove("is-shaking");
      void el.offsetWidth;
      el.classList.add("is-shaking");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const values = Object.fromEntries(def.fields.map((f) => [f.name, String(data.get(f.name) ?? "")]));
    const next: Record<string, string> = {};
    for (const f of def.fields) {
      const msg = validate(f, values[f.name]);
      if (msg) next[f.name] = msg;
    }
    setErrors(next);
    const bad = Object.keys(next);
    if (bad.length) {
      shake(bad);
      formRef.current?.querySelector<HTMLElement>(`[name="${bad[0]}"]`)?.focus();
      return;
    }

    if (!ENDPOINT) {
      // No form backend configured: hand the message to the visitor's email app.
      const body = def.fields
        .filter((f) => values[f.name].trim())
        .map((f) => `${f.label}: ${values[f.name].trim()}`)
        .join("\n");
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(def.subject)}&body=${encodeURIComponent(body)}`;
      setStatus("drafted");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ form: variant, ...values }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent" || status === "drafted") {
    return (
      <div className="rounded-[20px] border border-line bg-surface p-8 md:p-12" role="status">
        <span className="t-success-check text-accent-text" data-state="in" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.35" />
            <path d="M14 25l7 7 13-15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="h3 mt-6">{status === "sent" ? "Message sent." : "Your email draft is ready."}</h3>
        <p className="mt-3 max-w-[46ch] text-muted">
          {status === "sent"
            ? "Thank you. We will reply to the email address you gave us."
            : `Your email app should have opened with the message filled in. Press send there to reach us. If nothing opened, write to ${site.email}.`}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-8">
          Write another message
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {def.fields.map((f) => {
        const id = `${variant}-${f.name}`;
        const error = errors[f.name];
        const common = {
          id,
          name: f.name,
          required: f.required,
          autoComplete: f.autoComplete,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? `${id}-error` : undefined,
          className: "field",
          onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
            setError(f.name, validate(f, e.target.value)),
          onInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            if (error) setError(f.name, validate(f, e.currentTarget.value));
          },
        };
        return (
          <div key={f.name} className={`t-input-wrap grid gap-2 ${f.half ? "" : "sm:col-span-2"}`}>
            <label htmlFor={id} className="font-medium">
              {f.label}
              {!f.required && <span className="ml-2 text-sm font-normal text-muted">Optional</span>}
            </label>
            <div className={`t-input ${error ? "is-error" : ""}`} data-field={f.name}>
              {f.type === "textarea" ? (
                <textarea {...common} rows={4} />
              ) : f.type === "select" ? (
                <select {...common} defaultValue="">
                  <option value="">Select a team size</option>
                  {f.options?.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              ) : (
                <input {...common} type={f.type} inputMode={f.type === "email" ? "email" : undefined} />
              )}
            </div>
            {/* Space is reserved so a message appearing on blur never moves the submit button. */}
            <p id={`${id}-error`} className="flex min-h-5 items-center gap-1.5 text-sm text-danger">
              {error && (
                <>
                  <WarningCircle size={16} weight="fill" aria-hidden="true" />
                  {error}
                </>
              )}
            </p>
          </div>
        );
      })}

      <div className="sm:col-span-2">
        {status === "failed" && (
          <p role="alert" className="mb-4 flex items-start gap-1.5 text-danger">
            <WarningCircle size={18} weight="fill" aria-hidden="true" className="mt-1 shrink-0" />
            <span>
              The message could not be sent. Try again, or email us at{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </span>
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
          {status === "sending" ? "Sending..." : def.submit}
        </button>
      </div>
    </form>
  );
}
