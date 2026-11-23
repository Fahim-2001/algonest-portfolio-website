"use client";

import { useRef, useState } from "react";
import { WarningCircle } from "@phosphor-icons/react";
import { contact, site, type FieldDef } from "@/content/site";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const def = contact.form;

function validate(field: FieldDef, value: string) {
  const v = value.trim();
  if (field.required && !v) return def.errors.required.replace("{label}", field.label.toLowerCase());
  if (field.type === "email" && v && !EMAIL_RE.test(v)) return def.errors.email;
  return "";
}

/** Discovery-call request. Posts to NEXT_PUBLIC_FORM_ENDPOINT, or opens an email draft without one. */
export function LeadForm() {
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
        body: JSON.stringify({ form: "discovery-call", ...values }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "sent" || status === "drafted") {
    const done = status === "sent" ? def.sent : def.drafted;
    return (
      <div className="rounded-[20px] border border-line bg-surface p-8 md:p-12" role="status">
        <span className="t-success-check text-accent-text" data-state="in" aria-hidden="true">
          <svg width="56" height="56" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" opacity="0.35" />
            <path d="M14 25l7 7 13-15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="h3 mt-6">{done.heading}</h3>
        <p className="mt-3 max-w-[46ch] text-muted">
          {status === "sent" ? done.body : `${done.body} ${site.email}.`}
        </p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-secondary mt-8">
          {def.again}
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
      {def.fields.map((f: FieldDef) => {
        const id = `lead-${f.name}`;
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
              {!f.required && <span className="ml-2 text-sm font-normal text-muted">{def.optional}</span>}
            </label>
            <div className={`t-input ${error ? "is-error" : ""}`} data-field={f.name}>
              {f.type === "textarea" ? (
                <textarea {...common} rows={4} />
              ) : f.type === "select" ? (
                <select {...common} defaultValue="">
                  <option value="">{f.placeholder}</option>
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
              {def.failed}{" "}
              <a href={`mailto:${site.email}`} className="underline">
                {site.email}
              </a>
              .
            </span>
          </p>
        )}
        <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full sm:w-auto">
          {status === "sending" ? def.sending : def.submit}
        </button>
      </div>
    </form>
  );
}
