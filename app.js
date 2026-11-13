const config = window.BEASTWARS_CONFIG || {};
const rarityColors = {
  "Commun": "common", "Peu Commun": "uncommon", "Rare": "rare",
  "Épique": "epic", "Légendaire": "legendary", "Mythique": "mythic", "Divin": "divine"
};

const animals = [
  { name: "Renard", rarity: "Commun", price: 100, power: "Téléportation courte distance", icon: "🦊", description: "Rapide et rusé." },
  { name: "Aigle", rarity: "Peu Commun", price: 250, power: "Bond aérien", icon: "🦅", description: "Prend de la hauteur." },
  { name: "Requin", rarity: "Rare", price: 600, power: "Attaque aquatique", icon: "🦈", description: "Frappe avec puissance." },
  { name: "Tigre Électrique", rarity: "Épique", price: 1200, power: "Décharge électrique", icon: "🐅", description: "Maîtrise la foudre." },
  { name: "Loup de Glace", rarity: "Légendaire", price: 2500, power: "Ralentissement des adversaires", icon: "🐺", description: "Le froid ralentit ses ennemis." },
  { name: "Dragon", rarity: "Mythique", price: 6000, power: "Attaque de feu", icon: "🐉", description: "Une créature de flammes." },
  { name: "Phénix", rarity: "Divin", price: 15000, power: "Explosion de flammes", icon: "🔥", description: "Une puissance légendaire." }
];

const eggs = [
  { name: "Œuf classique", price: 500, icon: "🥚", rarity: "common-egg", odds: [["Commun",55],["Peu Commun",25],["Rare",13],["Épique",5],["Légendaire",2]] },
  { name: "Œuf rare", price: 2000, icon: "💠", rarity: "rare-egg", odds: [["Rare",50],["Épique",30],["Légendaire",15],["Mythique",5]] },
  { name: "Œuf divin", price: 10000, icon: "🌟", rarity: "divine-egg", odds: [["Légendaire",50],["Mythique",40],["Divin",10]] }
];

const passes = [
  ["👑","VIP PASS","Bonus de pièces quotidiennes, badge VIP, décoration de base, zone VIP et apparence de véhicule."],
  ["💎","PREMIUM PASS","Récompenses quotidiennes supplémentaires, décorations exclusives et emplacement animal supplémentaire."],
  ["🎒","PET STORAGE","Augmente la capacité de stockage de tes animaux."],
  ["🏎️","VEHICLE PASS","Débloque des apparences exclusives pour les véhicules."],
  ["⚔️","EXTRA EQUIP","Emplacements supplémentaires pour préparer tes animaux. Un seul animal reste actif à la fois."]
];

const roadmap = [
  { version:"V1", title:"Fondations du jeu", state:"En préparation", items:["Collection des animaux et raretés","Œufs et probabilités","Bases personnelles","Monnaie : pièces"] },
  { version:"V2", title:"Combat & progression", state:"À venir", items:["Arène PvP et pouvoirs","Amélioration des animaux (5 niveaux)","Boutique d'armes","Véhicules : 2 voitures et 2 motos","Échanges et cadeaux"] }
];

const animalGrid = document.querySelector("#animalGrid");
animalGrid.innerHTML = animals.map(a => `
  <article class="animal-card rarity-${rarityColors[a.rarity]}">
    <div class="animal-visual"><span class="animal-symbol" aria-hidden="true">${a.icon}</span><span class="rarity-badge">${a.rarity}</span></div>
    <div class="animal-info"><div class="animal-title"><h3>${a.name}</h3><span class="animal-price">◈ ${a.price.toLocaleString("fr-FR")}</span></div>
      <p class="animal-description">${a.description}</p><div class="power-label">POUVOIR SPÉCIAL</div><p class="animal-power">${a.power}</p></div>
  </article>`).join("");

document.querySelector("#eggGrid").innerHTML = eggs.map(e => `
  <article class="egg-card ${e.rarity}"><div class="egg-icon">${e.icon}</div><div class="egg-heading"><h3>${e.name}</h3><strong>◈ ${e.price.toLocaleString("fr-FR")} pièces</strong></div>
  <div class="odds-list">${e.odds.map(([name,chance]) => `<div class="odds-row"><span>${name}</span><div class="odds-track"><i class="rarity-${rarityColors[name]}" style="width:${chance}%"></i></div><b>${chance}%</b></div>`).join("")}</div></article>`).join("");

document.querySelector("#passList").innerHTML = passes.map(([icon,name,desc]) => `<article class="pass-item"><span>${icon}</span><div><h4>${name}</h4><p>${desc}</p></div></article>`).join("");
document.querySelector("#coinPacks").innerHTML = [["🪙","Petit pack"],["💰","Moyen pack"],["🏆","Grand pack"],["⏱️","Bonus temporaire"]].map(([i,n])=>`<div class="coin-pack"><span>${i}</span>${n}<b>À venir</b></div>`).join("");
document.querySelector("#roadmap").innerHTML = roadmap.map(r => `<article class="roadmap-card"><div class="roadmap-head"><span class="version">${r.version}</span><span class="roadmap-state">${r.state}</span></div><h3>${r.title}</h3><ul>${r.items.map(i=>`<li>${i}</li>`).join("")}</ul></article>`).join("");

const socialInfo = [["discord","Discord","◉"],["x","Twitter / X","𝕏"],["youtube","YouTube","▶"]];
document.querySelector("#socialLinks").innerHTML = socialInfo.map(([key,label,icon]) => {
  const url = config.socials?.[key] || "#";
  const inactive = url === "#";
  return `<a class="social-link ${inactive ? "is-placeholder" : ""}" href="${url}" ${inactive ? 'aria-disabled="true" title="Lien à ajouter dans config.js"' : 'target="_blank" rel="noopener"'}><span>${icon}</span>${label}<b>↗</b></a>`;
}).join("");

const playButton = document.querySelector("#playButton");
if (config.robloxUrl && config.robloxUrl !== "#") playButton.href = config.robloxUrl;
else { playButton.addEventListener("click", e => { e.preventDefault(); alert("Le lien Roblox sera ajouté ici lorsque le jeu sera publié."); }); }

const iconPath = config.gameIcon || "assets/game-icon.svg";
document.querySelectorAll(".brand-icon, .hero-game-icon").forEach(img => img.src = iconPath);
const progress = Math.max(0, Math.min(100, Number(config.developmentProgress ?? 35)));
document.querySelector("#progressValue").textContent = `${progress}%`;
document.querySelector("#progressBar").style.width = `${progress}%`;
document.querySelector("#year").textContent = new Date().getFullYear();

// Menu mobile
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
mainNav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  mainNav.classList.remove("is-open"); menuToggle.setAttribute("aria-expanded","false");
}));

// Commentaires : l'API Cloudflare Pages Functions se trouve dans functions/api/comments.js.
// Le texte utilisateur est inséré avec textContent pour éviter l'interprétation de HTML.
const commentForm = document.querySelector("#commentForm");
const commentsList = document.querySelector("#commentsList");
const commentStatus = document.querySelector("#commentStatus");
const commentCount = document.querySelector("#commentCount");

function showComments(items) {
  commentCount.textContent = items.length;
  if (!items.length) { commentsList.innerHTML = '<p class="empty-comments">Pas encore de commentaire. Sois le premier à écrire !</p>'; return; }
  commentsList.replaceChildren();
  items.forEach(item => {
    const article = document.createElement("article"); article.className = "community-comment";
    const top = document.createElement("div"); top.className = "community-comment-top";
    const name = document.createElement("strong"); name.textContent = item.name;
    const date = document.createElement("time");
    if (item.created_at) { const d = new Date(item.created_at); date.textContent = Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("fr-FR"); }
    top.append(name,date);
    const message = document.createElement("p"); message.textContent = item.message;
    article.append(top,message); commentsList.append(article);
  });
}
async function loadComments() {
  try {
    const response = await fetch("/api/comments");
    if (!response.ok) throw new Error("API indisponible");
    const data = await response.json(); showComments(data.comments || []);
  } catch {
    commentsList.innerHTML = '<p class="empty-comments">Salut toi tu a une chose a nous dire ?</p>';
    commentCount.textContent = "—";
  }
}
commentForm.addEventListener("submit", async event => {
  event.preventDefault();
  const form = new FormData(commentForm);
  const payload = { name: String(form.get("name") || "").trim(), message: String(form.get("message") || "").trim(), website: String(form.get("website") || "") };
  if (!payload.name || !payload.message) return;
  const button = document.querySelector("#commentSubmit");
  button.disabled = true; button.textContent = "ENVOI…"; commentStatus.textContent = "";
  try {
    const response = await fetch("/api/comments", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Impossible de publier le commentaire.");
    commentForm.reset(); commentStatus.textContent = "Commentaire publié !"; await loadComments();
  } catch (error) {
    commentStatus.textContent = error.message.includes("Failed to fetch") ? "Impossible de publier ton commentaire pour le moment. Réessaie plus tard" : error.message;
  } finally { button.disabled = false; button.innerHTML = 'PUBLIER LE COMMENTAIRE <span>↗</span>'; }
});
loadComments();
