// Cloudflare Pages Function : API publique de commentaires.
// Binding D1 requis : DB. Configure-le dans Cloudflare Pages > Settings > Functions.
function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}
export async function onRequestGet({ env }) {
  if (!env.DB) return json({ error: "Base de données non configurée." }, 503);
  try {
    const { results } = await env.DB.prepare(
      "SELECT id, name, message, created_at FROM comments ORDER BY id DESC LIMIT 50"
    ).all();
    return json({ comments: results || [] });
  } catch {
    return json({ error: "Impossible de charger les commentaires." }, 500);
  }
}
export async function onRequestPost({ request, env }) {
  if (!env.DB) return json({ error: "Base de données non configurée." }, 503);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({ error: "Format invalide." }, 415);
  let body;
  try { body = await request.json(); } catch { return json({ error: "Message invalide." }, 400); }

  // Champ piège anti-spam : les visiteurs normaux ne le remplissent jamais.
  if (typeof body.website === "string" && body.website.trim()) return json({ ok: true });
  const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (name.length < 2 || name.length > 24) return json({ error: "Le pseudo doit contenir entre 2 et 24 caractères." }, 400);
  if (message.length < 2 || message.length > 500) return json({ error: "Le commentaire doit contenir entre 2 et 500 caractères." }, 400);
  if (/[<>]/.test(name)) return json({ error: "Caractères non autorisés dans le pseudo." }, 400);

  try {
    await env.DB.prepare("INSERT INTO comments (name, message) VALUES (?, ?)").bind(name, message).run();
    return json({ ok: true }, 201);
  } catch {
    return json({ error: "Erreur lors de l'enregistrement du commentaire." }, 500);
  }
}
