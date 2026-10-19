export const CONTACT_EMAIL = "hello@egentek.in";

export class FormNotConfiguredError extends Error {
  constructor() {
    super("No form endpoint is configured.");
    this.name = "FormNotConfiguredError";
  }
}

/**
 * Sends a form to the endpoint set at build time in VITE_FORM_ENDPOINT (for example, the
 * URL of a form service). The site is static, so without an endpoint nothing can be sent.
 */
export async function submitForm(type: "application" | "contact", fields: Record<string, string>) {
  const endpoint = import.meta.env["VITE_FORM_ENDPOINT"];
  if (!endpoint) throw new FormNotConfiguredError();

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ type, ...fields, submittedAt: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error(`Form submission failed with status ${response.status}`);
}
