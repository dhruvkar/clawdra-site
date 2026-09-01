// AI SEO Audit request form -> GoHighLevel contact.
//
// Plain HTML form POSTs here and we answer with a 303 redirect, so the form
// works with JavaScript disabled or broken. No client-side fetch to go wrong.
//
// Three GHL behaviours this code is built around, each of which has cost real
// time before:
//   1. The WAF at services.leadconnectorhq.com 403s unfamiliar User-Agents.
//      Every request below sends an explicit one.
//   2. Passing `tags` in an upsert body REPLACES the contact's whole tag array.
//      Tags are therefore added afterwards via the additive tags endpoint.
//   3. Upsert dedupes on phone OR email, and a phone match overwrites the
//      stored email. That is acceptable for an inbound lead (the newest
//      details are the ones we want) but it is deliberate, not accidental.

const GHL_BASE = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";
const USER_AGENT = "clawdrop-site/1.0 (+https://clawdrop.org)";
const TAG = "seo-audit-request";
const SOURCE = "clawdrop.org - AI SEO Audit";

const SUCCESS_URL = "/audit-requested/";
const FAILURE_URL = "/ai-seo-audit/?error=1";

function redirect(location) {
  // 303 forces the browser to follow with GET, so a refresh cannot resubmit.
  return new Response(null, { status: 303, headers: { Location: location } });
}

/**
 * One fetch with retries. Retries network errors, 429 and 5xx; never retries a
 * 4xx, which means the request itself is wrong and will stay wrong.
 */
async function ghlFetch(path, init, attempts = 3) {
  let lastError = "";
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(`${GHL_BASE}${path}`, {
        ...init,
        headers: {
          Authorization: `Bearer ${process.env.GHL_PRIVATE_INTEGRATION_KEY_CLAWDROP}`,
          Version: GHL_VERSION,
          "User-Agent": USER_AGENT,
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(init?.headers ?? {}),
        },
        signal: AbortSignal.timeout(10_000),
      });

      if (res.ok) return { ok: true, body: await res.json().catch(() => ({})) };

      const text = await res.text().catch(() => "");
      lastError = `HTTP ${res.status} ${text.slice(0, 300)}`;
      if (res.status < 500 && res.status !== 429) return { ok: false, error: lastError };
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 400 * 2 ** i));
  }
  return { ok: false, error: lastError };
}

function splitName(full) {
  const parts = (full ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** Accept "acme.com" as readily as "https://acme.com". */
function tidyUrl(raw) {
  const v = (raw ?? "").trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

export default async (req) => {
  if (req.method !== "POST") return redirect(FAILURE_URL);

  let form;
  try {
    form = await req.formData();
  } catch {
    return redirect(FAILURE_URL);
  }
  const get = (k) => (form.get(k) ?? "").toString().trim();

  // Honeypot. Bots fill every field they find; people never see this one.
  // Answer with the success page so the bot has nothing to learn from.
  if (get("company-fax")) return redirect(SUCCESS_URL);

  const name = get("name");
  const email = get("email");
  const business = get("business");
  const website = tidyUrl(get("website"));
  const phone = get("phone");
  const towns = get("towns");

  if (!name || !email || !business || !website) return redirect(FAILURE_URL);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return redirect(FAILURE_URL);

  const locationId = process.env.GHL_LOCATION_ID_CLAWDROP;
  if (!locationId || !process.env.GHL_PRIVATE_INTEGRATION_KEY_CLAWDROP) {
    console.error("seo-audit: GHL env vars missing", { submission: { name, email, business, website, phone, towns } });
    return redirect(FAILURE_URL);
  }

  const { firstName, lastName } = splitName(name);

  // Step 1: the contact itself. No tags in this body on purpose (see note 2).
  const upsert = await ghlFetch("/contacts/upsert", {
    method: "POST",
    body: JSON.stringify({
      locationId,
      firstName,
      lastName,
      name,
      email,
      ...(phone ? { phone } : {}),
      companyName: business,
      website,
      source: SOURCE,
    }),
  });

  if (!upsert.ok) {
    // Log the whole submission so a failed lead is recoverable from function
    // logs rather than silently gone.
    console.error("seo-audit: upsert failed", upsert.error, { name, email, business, website, phone, towns });
    return redirect(FAILURE_URL);
  }

  const contactId = upsert.body?.contact?.id ?? upsert.body?.id;
  if (!contactId) {
    console.error("seo-audit: no contact id in response", JSON.stringify(upsert.body).slice(0, 400));
    return redirect(FAILURE_URL);
  }

  // Step 2 and 3 are best-effort. The lead is already captured; losing a tag
  // or a note is not worth showing this person an error page.
  const tagRes = await ghlFetch(`/contacts/${contactId}/tags`, {
    method: "POST",
    body: JSON.stringify({ tags: [TAG] }),
  });
  if (!tagRes.ok) console.error("seo-audit: tag failed", tagRes.error, contactId);

  const noteBody = [
    "AI SEO Audit request from clawdrop.org",
    `Business: ${business}`,
    `Website: ${website}`,
    `Towns covered: ${towns || "(not given)"}`,
    `Phone: ${phone || "(not given)"}`,
    `Submitted: ${new Date().toISOString()}`,
  ].join("\n");

  const noteRes = await ghlFetch(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body: noteBody }),
  });
  if (!noteRes.ok) console.error("seo-audit: note failed", noteRes.error, contactId);

  return redirect(SUCCESS_URL);
};

export const config = { path: "/api/seo-audit" };
