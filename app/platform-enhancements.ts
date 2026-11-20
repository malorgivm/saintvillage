type Track = {
  title: string
  artist: string
  src: string
}

const portraits = [
  { name: "Detetive de chapéu", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r1-0rXVaIBVVUIh3nlh9TnfPpE0w5Jz78.jpg" },
  { name: "Policial uniformizado", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r2-eWumgvRwIAMfvbAEXcpJ52SfP0e3rx.jpg" },
  { name: "Jovem de terno", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r3-0H2tD61HIGTpvv0JVyfoWzvE8sUUJS.jpg" },
  { name: "Mulher de blazer", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r4-OhYJ5H7FQ0iO3acjsRJXMPRMcf0mLv.jpg" },
  { name: "Homem musculoso", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r5-rKgB3I68nag62WpnRidYOMLlVV50PQ.jpg" },
]

const backgrounds = {
  noir8: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir8-FeyZilEnAqHfAj4ABF99wcgnzWmm2g.jpg",
  noir1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir1-zVgLN8ZDzaBGMKHWrHO1y5ke4OJGdo.jpg",
  noir3: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir3-i1wUOpe7vXxrpVlHQXtu8bUKXouYCw.jpg",
  noir2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir2-wLq60J7aS1iDCazjElsDUi7Y7rCv6Q.jpg",
  noir6: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir6-gDkwsElMeUqjPidaWSZxYtiR4VVYnB.jpg",
  noir7: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir7-JEvaRNhWrejcvctCBWz9nUQQCKWhSu.jpg",
  noir5: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir5-hBEZ6hTXsOR3fcUESIyWHcLXM5nwHb.jpg",
  noir4: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noir4-EvhmUa3v7rz8YZMafumhr3nLLYEmo8.jpg",
}

const tracks: Track[] = [
  { title: "Police Interrogation", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-police-interrogation-asmr-noir-jazz-520244-PkdhE79hnUieiPBiub6B76YI2F6VLW.mp3" },
  { title: "Surf Rock", artist: "Alex Morgan", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alex-morgan-surf-rock-591326-cLOutieQk9dpAUySG1BVTEAcq6r9hA.mp3" },
  { title: "Noir Jazz Detective Midnight Mystery", artist: "Alex Morgan", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/alex-morgan-noir-jazz-detective-midnight-mystery-587403-bLGjPRuIxgFsncKuySX7Vu9gUgG0bP.mp3" },
  { title: "Film Noir", artist: "NoirTales", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/noirtales-film-noir-566510-RaHcuDj9Bj5zqEiHfgIsHj3a479NFV.mp3" },
  { title: "Crime Scene Investigation", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-crime-scene-investigation-asmr-noir-jazz-520242-qXaIO6mrOuACxqJSF31IEitvzZTBig.mp3" },
  { title: "Noir", artist: "Madstock", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/madstock-noir-340140-CdKLSQd5rvE6kaNNlEPxS3nA1nc5TG.mp3" },
  { title: "Energetic Garage Rock", artist: "Abydos Music", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abydos_music-energetic-garage-rock-171763-9sKX2Cyja1VtYcbyVgoY0w5CLiHgMj.mp3" },
  { title: "Cobra", artist: "Octosound", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/octosound-cobra-169065-BMPf3eosEAxxJMp4uqPCIC55JTqPI3.mp3" },
  { title: "Funk Instrumental", artist: "Sub Clair", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/sub_clair-funk-instrumental-610619-tb7vj7QfqGZ4l95ZF8O4lluy5MAwJ7.mp3" },
  { title: "Gritty Noir", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-gritty-noir-asmr-noir-jazz-520243-L5K4TnSzyvgfvn20g9dkGxKRD1j6Qh.mp3" },
  { title: "Spy Surf", artist: "Remstunes", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/remstunes-spy-surf-392415-fxBdx6LADWsbdrGPxPM4K16mDtdlEN.mp3" },
  { title: "Spaghetti Western", artist: "Positive Sound", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/positive_sound-spaghetti-western-491538-9tlaZK1SUJZ0XWvtHPgCFhlafqj7TT.mp3" },
  { title: "Forensic Evidence", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-forensic-evidence-asmr-noir-jazz-520236-wRUHLcYTdtmWS3xbJSehCuq73pepPm.mp3" },
  { title: "Western Theme", artist: "Luis Humanoide", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/luis_humanoide-western-theme-162884-KlaIU2zfTxqALmQzMJTgZxFIrWAkru.mp3" },
  { title: "Unsolved Mystery", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-unsolved-mystery-asmr-noir-jazz-520239-cSDD9LlTxRJ4ZTeWGqTNUfMaFJuoBA.mp3" },
  { title: "Noir Piano Club", artist: "Mark Music Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/markmusicstudio-noir-piano-club-572124-XfktxhIlUMFlzgZSzfVgAK2oQwA1D9.mp3" },
  { title: "My Crime Story", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-my-crime-story-asmr-noir-jazz-520241-9Sl04cw90QAYpi59MVwl1AYtTuScFg.mp3" },
  { title: "La Siesta del Pistolero", artist: "Emand Edroff", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/emand_edroff-la-siesta-del-pistolero-616040-wFzpKEGknTrPDROrRBxd6GpOoXRyOb.mp3" },
  { title: "Midnight Mirage", artist: "Vlad Annenkov", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vlad_annenkov-tarantino-blues-quotmidnight-mirage-471931-cedpBVLNtQYXEpWjb93sJYj2SiOQ9Z.mp3" },
  { title: "Suspect Profiling", artist: "Konstantin Pazuzu Studio", src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/konstantinpazuzustudio-suspect-profiling-asmr-noir-jazz-520237-dHYBRbSDJSLfhNAU7vX0d47tdn1MWd.mp3" },
]

const enhancementStyles = `
  body, .svs-pad { background-color: #020203 !important; background-image: none !important; }
  .sv-v0-scene {
    transition: none !important;
    background-color: #020203 !important;
    background-attachment: scroll !important;
    background-position: center top !important;
    background-repeat: no-repeat !important;
    background-size: cover !important;
  }
  .sc-host > div > div[style*="position: fixed"][style*="z-index: 0"] { background: transparent !important; background-image: none !important; }
  .sc-host > div > div[style*="position: fixed"][style*="z-index: 0"] > div[style*="fundos/noir"] {
    background: none !important; filter: none !important; transform: none !important; opacity: 0 !important;
    transition: none !important; will-change: auto !important;
  }
  .sv-hdrwrap, .sv-hdrwrap > .sv-hdr {
    background-color: #010101 !important;
    background-image: none !important;
    border-bottom: 0 !important;
    box-shadow: none !important;
  }
  .sv-hdrwrap::before, .sv-hdrwrap::after, .sv-hdr::before, .sv-hdr::after {
    content: none !important;
    display: none !important;
  }
  .sv-content {
    box-sizing: border-box !important;
    min-height: 100dvh !important;
    padding-bottom: clamp(132px, 20dvh, 200px) !important;
    background-color: transparent !important;
    background-image: none !important;
  }
  .sv-to { display: none !important; }
  .sv-v0-secret-field { display: none !important; }
  .sv-v0-chat-help { margin: 8px 0 0; color: rgb(255 255 255 / 62%); font: 12px/1.5 var(--font-courier, monospace); }
  .sv-v0-chat-status { min-height: 1.5em; margin: 4px 0 0; color: #eee; font: 12px/1.5 var(--font-courier, monospace); }
  .sv-hdrwrap > div {
    flex-wrap: nowrap !important;
    overscroll-behavior-inline: contain;
    scrollbar-width: none;
  }
  .sv-hdrwrap > div::-webkit-scrollbar { display: none; }
  .sv-hdrwrap > div > .sv-tab { flex: 0 0 auto !important; }
  @media (max-width: 600px) {
    .sv-hdrwrap > div { justify-content: flex-start !important; }
  }
  .svr-foto { position: relative !important; overflow: hidden !important; }
  .svr-foto .sv-v0-portrait { display: block; width: 100%; height: 100%; min-height: 190px; object-fit: cover; filter: grayscale(1) contrast(1.08); }
  .sv-v0-portrait-picker { width: min(94vw, 760px); max-height: min(88vh, 780px); padding: 22px; border: 1px solid #777; color: #f3f3f3; background: #101012; box-shadow: 0 20px 80px #000; }
  .sv-v0-portrait-picker::backdrop, .sv-v0-playlist::backdrop { background: rgb(0 0 0 / 78%); backdrop-filter: blur(5px); }
  .sv-v0-dialog-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 18px; }
  .sv-v0-dialog-head h2 { margin: 0; font: 500 13px/1.4 Oswald, sans-serif; letter-spacing: .2em; text-transform: uppercase; }
  .sv-v0-close { border: 1px solid #555; background: transparent; color: #fff; padding: 8px 12px; font: 11px Oswald, sans-serif; letter-spacing: .12em; cursor: pointer; }
  .sv-v0-portrait-grid { display: grid; grid-template-columns: repeat(5,minmax(0,1fr)); gap: 12px; max-height: calc(88vh - 110px); overflow: auto; scrollbar-color: #666 #161618; }
  .sv-v0-portrait-choice { display: flex; flex-direction: column; gap: 8px; padding: 6px; border: 1px solid #444; background: #18181a; color: #eee; text-align: left; cursor: pointer; }
  .sv-v0-portrait-choice:hover, .sv-v0-portrait-choice:focus-visible { border-color: #ddd; outline: 1px solid #ddd; }
  .sv-v0-portrait-choice img { display: block; width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: grayscale(1); }
  .sv-v0-portrait-choice span { font: 10px/1.4 Oswald, sans-serif; letter-spacing: .08em; }
  .sv-v0-playlist { width: min(92vw, 520px); max-height: min(86vh, 720px); padding: 20px; border: 1px solid #777; color: #f3f3f3; background: #101012; }
  .sv-v0-track-list { display: flex; flex-direction: column; gap: 4px; max-height: 62vh; overflow: auto; }
  .sv-v0-track { display: grid; grid-template-columns: 34px minmax(0,1fr); gap: 10px; align-items: center; width: 100%; padding: 9px 10px; border: 1px solid transparent; background: transparent; color: #eee; text-align: left; cursor: pointer; }
  .sv-v0-track:hover, .sv-v0-track:focus-visible, .sv-v0-track[aria-current="true"] { border-color: #777; background: #242426; outline: none; }
  .sv-v0-track-num { color: #999; font: 11px Oswald, sans-serif; }
  .sv-v0-track-title { display: block; font: 12px/1.4 Oswald, sans-serif; letter-spacing: .08em; }
  .sv-v0-track-artist { display: block; margin-top: 2px; color: #aaa; font: 10px/1.4 Oswald, sans-serif; }
  .svs-b.sv-v0-list-button { width: auto; min-width: 42px; padding: 0 8px; font-size: 9px; letter-spacing: .06em; }
  .sv-v0-expand { display: none; }
  .svs.cl .sv-v0-expand { position: absolute; inset: 0; z-index: 2; display: grid; width: 28px; height: 28px; place-items: center; border: 0; border-radius: 50%; background: transparent; color: rgb(255 255 255 / 68%); font-size: 14px; cursor: pointer; }
  .svs.cl { width: 48px !important; height: 48px !important; opacity: .62; border-color: rgb(255 255 255 / 18%) !important; background: rgb(0 0 0 / 48%) !important; }
  .svs.cl:hover, .svs.cl:focus-within { opacity: 1; }
  .sv-content button:hover, .sv-content button:focus-visible,
  .sv-content a:hover, .sv-content a:focus-visible,
  .sv-content input:hover, .sv-content input:focus-visible,
  .sv-content select:hover, .sv-content select:focus-visible,
  .sv-content textarea:hover, .sv-content textarea:focus-visible,
  .sv-content summary:hover, .sv-content summary:focus-visible {
    border-color: #fff !important;
    outline-color: #fff !important;
    box-shadow: 0 0 0 1px rgb(255 255 255 / 72%) !important;
  }
  .sv-v0-epigraph { font-size: clamp(16px, 4.8vw, 23px) !important; line-height: 1.28 !important; margin-block: 12px !important; max-width: 100% !important; }
  .sv-v0-epigraph-author { font-size: clamp(10px, 3vw, 13px) !important; line-height: 1.3 !important; letter-spacing: .1em !important; }
  .sv-v0-mobile-copy { width: 100% !important; max-width: none !important; font-size: clamp(13px, 3.6vw, 15px) !important; line-height: 1.52 !important; overflow-wrap: break-word !important; word-break: normal !important; }
  .sv-v0-chat-status:empty { display: none; }
  .sv-content :where(button, a, input, select, textarea, summary), .sv-hdrwrap .sv-tab, .svs.cl {
    transition: color .22s ease, background-color .22s ease, border-color .22s ease, box-shadow .22s ease, opacity .25s ease;
  }
  .sv-hdrwrap .sv-tab:hover, .sv-hdrwrap .sv-tab:focus-visible {
    color: #fff !important;
    border-color: #fff !important;
    outline-color: #fff !important;
    box-shadow: 0 0 0 1px rgb(255 255 255 / 68%) !important;
  }
  @media (max-width: 600px) {
    .sv-content { width: 100% !important; max-width: 100vw !important; padding: 18px 12px clamp(132px, 20dvh, 200px) !important; overflow-x: hidden !important; }
    .sv-content .sv-doc { box-sizing: border-box !important; width: 100% !important; max-width: 100% !important; min-width: 0 !important; padding: 14px !important; gap: 18px !important; }
    .sv-content p, .sv-content blockquote { width: 100%; max-width: 100% !important; font-size: clamp(13px, 3.6vw, 15px) !important; line-height: 1.52 !important; overflow-wrap: break-word !important; word-break: normal !important; text-wrap: pretty; }
    .sv-content h1, .sv-content h2, .sv-content h3 { max-width: 100% !important; line-height: 1.12 !important; overflow-wrap: break-word !important; word-break: normal !important; }
    .sv-modes, .svmini-modes { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; width: 100% !important; min-width: 0 !important; }
    .sv-modes > button, .svmini-modes > button { box-sizing: border-box !important; min-width: 0 !important; width: 100% !important; padding: 9px 3px !important; font-size: 10px !important; letter-spacing: .07em !important; white-space: nowrap !important; text-align: center !important; }
    .svf-hd { display: grid !important; grid-template-columns: minmax(72px, 88px) minmax(0, 1fr) !important; align-items: start !important; justify-content: stretch !important; gap: 12px !important; width: 100% !important; margin-bottom: 14px !important; }
    .svf-ret { grid-column: 1 !important; grid-row: 1 / span 2 !important; width: 88px !important; min-width: 0 !important; }
    .svr-foto { width: 88px !important; height: 118px !important; min-height: 0 !important; }
    .svr-foto .sv-v0-portrait { min-height: 0 !important; }
    .svf-hd > :nth-child(2) { grid-column: 2 !important; grid-row: 1 !important; width: 100% !important; min-width: 0 !important; align-self: start !important; }
    .svf-hd > :nth-child(2) > div:nth-child(2) { margin-top: 8px !important; font-size: clamp(22px, 5.8vw, 30px) !important; line-height: 1.08 !important; overflow-wrap: break-word !important; word-break: normal !important; }
    .svf-meta { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px !important; min-width: 0 !important; }
    .svf-meta > div { min-width: 0 !important; }
    .svf-meta small { font-size: 10px !important; letter-spacing: .14em !important; }
    .svf-meta b { font-size: clamp(13px, 3.5vw, 16px) !important; line-height: 1.22 !important; overflow-wrap: break-word !important; word-break: normal !important; }
    .svf-hd > .sv-pronto { grid-column: 2 !important; grid-row: 2 !important; align-items: stretch !important; width: 100% !important; min-width: 0 !important; }
    .svf-hd > .sv-pronto select { box-sizing: border-box !important; width: 100% !important; min-width: 0 !important; font-size: 12px !important; }
    .sv-v0-profile-actions { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 7px !important; align-items: center !important; }
    .sv-v0-profile-actions > * { min-width: 0 !important; }
    .sv-v0-profile-actions :is(button, a, [role=button]) { box-sizing: border-box !important; width: 100% !important; min-width: 0 !important; padding: 8px 3px !important; font-size: 9px !important; letter-spacing: .03em !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; }
    .sv-v0-portrait-picker { padding: 16px; }
    .sv-v0-portrait-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .sv-v0-portrait-choice img { aspect-ratio: 1/1; }
    .svr-foto .sv-v0-portrait { min-height: 0; }
    .sv-v0-epigraph { font-size: clamp(17px, 5vw, 22px) !important; line-height: 1.25 !important; }
    .sv-v0-epigraph-author { font-size: clamp(10px, 3vw, 13px) !important; }
    .sv-v0-chat-help, .sv-v0-chat-status { font-size: 11px; }
    .sv-compose { display: flex !important; align-items: stretch !important; gap: 8px !important; min-width: 0 !important; padding: 8px !important; }
    .sv-compose textarea { box-sizing: border-box !important; flex: 1 1 auto !important; min-width: 0 !important; min-height: 54px !important; padding: 10px !important; font-size: 16px !important; line-height: 1.35 !important; }
    .sv-compose > button { flex: 0 0 auto !important; min-width: 66px !important; padding: 8px !important; font-size: 10px !important; letter-spacing: .08em !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sv-v0-scene, .sv-content :where(button, a, input, select, textarea, summary), .sv-hdrwrap .sv-tab, .svs.cl { transition: none !important; animation: none !important; }
  }
`

function getActiveSlug(doc: Document) {
  try {
    const profile = JSON.parse(doc.defaultView?.localStorage.getItem("sv-perfil-atual") ?? "null")
    return typeof profile?.slug === "string" ? profile.slug : "default"
  } catch {
    return "default"
  }
}

type AutoMemoryKind = "nota" | "contato" | "laço"
type AutoMemoryItem = { kind: AutoMemoryKind; text: string }
type NarratorRequest = {
  system?: string
  messages?: Array<{ role?: string; content?: unknown }>
  [key: string]: unknown
}
type NarratorWindow = Window & {
  svAI?: (request: NarratorRequest) => Promise<unknown>
  __svV0MemoryInstalled?: boolean
}

const memoryLabels: Record<AutoMemoryKind, string> = {
  nota: "Nota",
  contato: "Contato",
  "laço": "Laço",
}

function normalizeMemoryText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ").trim().toLocaleLowerCase("pt-BR")
}

function memoryStorageKey(doc: Document) {
  return `sv-v0-auto-memory:${getActiveSlug(doc)}`
}

function readAutoMemory(doc: Document): AutoMemoryItem[] {
  try {
    const stored = JSON.parse(doc.defaultView?.localStorage.getItem(memoryStorageKey(doc)) ?? "[]")
    return Array.isArray(stored)
      ? stored.filter((item): item is AutoMemoryItem =>
          item && ["nota", "contato", "laço"].includes(item.kind) && typeof item.text === "string",
        )
      : []
  } catch {
    return []
  }
}

function formatAutoMemory(item: AutoMemoryItem) {
  return `${memoryLabels[item.kind]} · ${item.text}`
}

function dispatchDocumentEvent(doc: Document, target: EventTarget, type: "input" | "change") {
  const event = doc.createEvent("Event")
  event.initEvent(type, true, false)
  target.dispatchEvent(event)
}

function syncAutoMemory(doc: Document) {
  const field = doc.querySelector<HTMLTextAreaElement>('.sv-content .sv-step textarea.sv-pauta[placeholder=""]')
  const win = doc.defaultView
  if (!field || !win) return

  const existing = new Set(field.value.split("\n").map(normalizeMemoryText))
  const additions = readAutoMemory(doc)
    .map(formatAutoMemory)
    .filter((line) => !existing.has(normalizeMemoryText(line)))
  if (!additions.length) return

  const nextValue = [field.value.trimEnd(), ...additions].filter(Boolean).join("\n")
  const setter = Object.getOwnPropertyDescriptor(win.HTMLTextAreaElement.prototype, "value")?.set
  if (setter) setter.call(field, nextValue)
  else field.value = nextValue

  dispatchDocumentEvent(doc, field, "input")
  dispatchDocumentEvent(doc, field, "change")
}

function toAutoMemoryItems(kind: AutoMemoryKind, value: unknown): AutoMemoryItem[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((entry): entry is string => typeof entry === "string")
    .map((entry) => entry.replace(/\s+/g, " ").trim().slice(0, 240))
    .filter(Boolean)
    .slice(0, 5)
    .map((text) => ({ kind, text }))
}

function saveAutoMemory(doc: Document, items: AutoMemoryItem[]) {
  if (!items.length) return
  const win = doc.defaultView
  if (!win) return

  const merged = readAutoMemory(doc)
  const seen = new Set(merged.map((item) => normalizeMemoryText(formatAutoMemory(item))))
  for (const item of items) {
    const key = normalizeMemoryText(formatAutoMemory(item))
    if (!seen.has(key)) {
      merged.push(item)
      seen.add(key)
    }
  }

  try {
    win.localStorage.setItem(memoryStorageKey(doc), JSON.stringify(merged.slice(-120)))
  } catch {
    return
  }
  syncAutoMemory(doc)
}

function installNarratorMemoryBridge(doc: Document) {
  const win = doc.defaultView as NarratorWindow | null
  if (!win?.svAI || win.__svV0MemoryInstalled) return

  const original = win.svAI.bind(win)
  win.svAI = async (request) => {
    const userText = (request.messages ?? [])
      .map((message) => typeof message.content === "string" ? message.content : "")
      .join("\n")
    const context = `${request.system ?? ""}\n${userText}`
    const isDirectorQuestion = /PERGUNTA FORA DE CENA AO DIRETOR|PERGUNTA DO JOGADOR AO DIRETOR/i.test(context)
    const isSceneAction = !isDirectorQuestion && /\bAGORA:/i.test(userText)
    const prompt = isSceneAction
      ? `${request.system ?? ""}\n\nREGISTRO AUTOMÁTICO DA FICHA: depois da narração, inclua um bloco final <SVFICHA>{\"notas\":[],\"contatos\":[],\"lacos\":[]}</SVFICHA>. Preencha as listas somente com fatos novos, confirmados nesta interação: notas para pistas e acontecimentos importantes; contatos para pessoas nomeadas e a relação estabelecida; lacos para mudanças reais em vínculos existentes. Não invente relações, não repita dados já conhecidos e deixe listas vazias quando não houver atualização. O bloco é metadado e não deve aparecer na narração.}`
      : request.system

    const response = await original({ ...request, system: prompt })
    if (!isSceneAction || typeof response !== "string") return response

    const marker = /<SVFICHA>([\s\S]*?)<\/SVFICHA>/gi
    let cleanResponse = response
    for (const match of response.matchAll(marker)) {
      try {
        const data = JSON.parse(match[1]) as { notas?: unknown; contatos?: unknown; lacos?: unknown }
        saveAutoMemory(doc, [
          ...toAutoMemoryItems("nota", data.notas),
          ...toAutoMemoryItems("contato", data.contatos),
          ...toAutoMemoryItems("laço", data.lacos),
        ])
      } catch {
        continue
      }
    }
    cleanResponse = cleanResponse.replace(marker, "").replace(/\n{3,}/g, "\n\n").trim()
    return cleanResponse
  }
  win.__svV0MemoryInstalled = true
}

function hideCharacterSecret(doc: Document) {
  const secret = doc.querySelector<HTMLElement>(".sv-content .sv-seg-grid")
  secret?.parentElement?.classList.add("sv-v0-secret-field")
}

function ensureComposerInstructions(doc: Document) {
  const composer = doc.querySelector<HTMLElement>(".sv-compose")
  const textarea = composer?.querySelector<HTMLTextAreaElement>("textarea")
  if (!composer || !textarea) return

  let help = doc.getElementById("sv-v0-chat-help")
  if (!help) {
    help = doc.createElement("p")
    help.id = "sv-v0-chat-help"
    help.className = "sv-v0-chat-help"
    help.textContent = "Para falar com alguém em cena: /Nome do personagem: sua fala."
  }
  if (help.previousElementSibling !== composer) composer.insertAdjacentElement("afterend", help)

  let status = doc.getElementById("sv-v0-chat-status")
  if (!status) {
    status = doc.createElement("p")
    status.id = "sv-v0-chat-status"
    status.className = "sv-v0-chat-status"
    status.setAttribute("role", "status")
    status.setAttribute("aria-live", "polite")
    status.setAttribute("aria-atomic", "true")
  }
  if (status.previousElementSibling !== help) help.insertAdjacentElement("afterend", status)

  const describedBy = new Set((textarea.getAttribute("aria-describedby") ?? "").split(/\s+/).filter(Boolean))
  describedBy.add(help.id)
  textarea.setAttribute("aria-describedby", [...describedBy].join(" "))
}

function installComposerEnhancements(doc: Document) {
  ensureComposerInstructions(doc)
  doc.addEventListener("click", (event) => {
    const target = event.target as Element | null
    const button = target?.closest<HTMLButtonElement>('button[aria-label="Enviar para o narrador"]')
    const composer = button?.closest<HTMLElement>(".sv-compose")
    const textarea = composer?.querySelector<HTMLTextAreaElement>("textarea")
    const recipient = composer?.querySelector<HTMLSelectElement>(".sv-to select")
    if (!button || !composer || !textarea || !recipient) return

    const status = doc.getElementById("sv-v0-chat-status")
    const setStatus = (message: string) => { if (status) status.textContent = message }
    const raw = textarea.value.trim()
    if (!raw.startsWith("/")) {
      recipient.value = ""
      dispatchDocumentEvent(doc, recipient, "change")
      setStatus("")
      return
    }

    event.preventDefault()
    event.stopImmediatePropagation()
    const command = raw.slice(1).trim()
    const separator = command.indexOf(":")
    const requestedName = separator >= 0 ? command.slice(0, separator).trim() : ""
    const message = separator >= 0 ? command.slice(separator + 1).trim() : ""
    const options = [...recipient.options].filter((option) =>
      option.value && normalizeMemoryText(option.textContent ?? "") !== "a cena",
    )
    const matched = options.find((option) => {
      const label = option.textContent?.trim() ?? ""
      const shortName = label.split(/\s*[·—–]\s*/, 1)[0].trim()
      const requested = normalizeMemoryText(requestedName)
      return requested && (requested === normalizeMemoryText(shortName) || requested === normalizeMemoryText(label))
    })

    if (!requestedName || !message || !matched) {
      setStatus(!options.length
        ? "Não há personagens disponíveis nesta cena. Use /Nome: fala quando alguém estiver presente."
        : !requestedName || separator < 0 || !message
          ? "Use o formato /Nome exato: sua fala."
          : `Não encontrei “${requestedName}” nesta cena. Confira o nome no elenco.`)
      return
    }

    recipient.value = matched.value
        dispatchDocumentEvent(doc, recipient, "change")
    textarea.value = message
    dispatchDocumentEvent(doc, textarea, "input")
    setStatus("")
    doc.defaultView?.setTimeout(() => {
      if (recipient.value === matched.value) {
        recipient.value = ""
        dispatchDocumentEvent(doc, recipient, "change")
      }
    }, 0)
  }, true)
}

function renameInvestigationButtons(doc: Document) {
  const buttons = [...doc.querySelectorAll<HTMLButtonElement>(".sv-content button")]
  for (const button of buttons) {
    const match = button.textContent?.trim().match(/^\+([1-3])$/)
    if (!match) continue

    let group: HTMLElement | null = button.parentElement
    let hasFreeUse = false
    for (let depth = 0; group && depth < 5; depth++, group = group.parentElement) {
      const labels = [...group.querySelectorAll("button")].map((item) => item.textContent?.trim() ?? "")
      if (labels.some((label) => /^(usar|central)$/i.test(label))) {
        hasFreeUse = true
        break
      }
    }
    if (!hasFreeUse) continue

    const amount = Number(match[1])
    button.textContent = `Pagar ${amount}`
    button.setAttribute("aria-label", `Pagar ${amount} ponto${amount === 1 ? "" : "s"} da reserva da habilidade`)
    button.title = `Gasta ${amount} ponto${amount === 1 ? "" : "s"} da reserva e amplia a pista.`

    const freeButton = [...(group?.querySelectorAll<HTMLButtonElement>("button") ?? [])]
      .find((item) => /^usar$/i.test(item.textContent?.trim() ?? ""))
    if (freeButton) {
      freeButton.textContent = "Central"
      freeButton.setAttribute("aria-label", "Receber a pista central sem gastar reserva")
      freeButton.title = "Recebe apenas a pista central, sem custo de reserva."
    }
  }
}

function tuneMobileCopy(doc: Document) {
  const blocks = [...doc.querySelectorAll<HTMLElement>(".sv-content p, .sv-content blockquote, .sv-content div, .sv-content span")]
  for (const block of blocks) {
    const text = (block.innerText ?? block.textContent ?? "").replace(/\s+/g, " ").trim()
    if (text.length < 150 || block.querySelector("button, input, select, textarea")) continue
    const hasLongChild = [...block.children].some((child) => (child.textContent ?? "").trim().length >= 150)
    if (!hasLongChild) block.classList.add("sv-v0-mobile-copy")
  }

  const quote = blocks
    .filter((block) => /Em Saint Village a chuva/i.test(block.textContent ?? ""))
    .sort((a, b) => a.children.length - b.children.length)[0]
  quote?.classList.add("sv-v0-epigraph")
  const author = blocks
    .filter((block) => /Jack Reilly,?\s*detetive particular/i.test(block.textContent ?? ""))
    .sort((a, b) => a.children.length - b.children.length)[0]
  author?.classList.add("sv-v0-epigraph-author")
}

function compactProfileActions(doc: Document) {
  const controls = [...doc.querySelectorAll<HTMLElement>("button, a, [role=button]")]
  const change = controls.find((item) => /trocar.*investigador/i.test(item.textContent ?? ""))
  const exportButton = controls.find((item) => /exportar/i.test(item.textContent ?? ""))
  const importButton = controls.find((item) => /importar/i.test(item.textContent ?? ""))
  if (!change || !exportButton || !importButton) return

  let group: HTMLElement | null = change.parentElement
  for (let depth = 0; group && depth < 5; depth++, group = group.parentElement) {
    const childControls = group.querySelectorAll("button, a, [role=button]")
    if (group.contains(exportButton) && group.contains(importButton) && childControls.length <= 8) {
      group.classList.add("sv-v0-profile-actions")
      return
    }
  }
}

export function installPlatformEnhancements(doc: Document) {
  if (doc.getElementById("sv-v0-enhancements")) return

  const style = doc.createElement("style")
  style.id = "sv-v0-enhancements"
  style.textContent = enhancementStyles
  doc.head.append(style)

  const appRoot = doc.querySelector<HTMLElement>(".sc-host > div")
  const sceneByTab: Record<string, string> = {
    cronica: backgrounds.noir5,
    caso: backgrounds.noir2,
    ficha: backgrounds.noir1,
    elenco: backgrounds.noir3,
    cenario: backgrounds.noir6,
    tutorial: backgrounds.noir8,
  }
  let activeScene = ""
  const updateScene = () => {
    if (!appRoot) return
    const content = doc.querySelector<HTMLElement>(".sv-content")
    const selectedTab = doc.querySelector<HTMLElement>('.sv-tab[aria-selected="true"]')
    const key = selectedTab?.dataset.k ?? "home"
    const equipmentOpen = [...doc.querySelectorAll(".sv-doc details[open]")].some((detail) => /equipamento/i.test(detail.textContent ?? ""))
    const src = key === "ficha" && equipmentOpen ? backgrounds.noir7 : key === "cronica" && doc.querySelector(".sv-home") ? backgrounds.noir4 : sceneByTab[key] ?? backgrounds.noir8
    if (src === activeScene && appRoot.dataset.svScene === src && content?.dataset.svScene === src) return
    activeScene = src
    appRoot.dataset.svScene = src
    appRoot.classList.add("sv-v0-scene")
    appRoot.style.setProperty("background-image", `linear-gradient(180deg, rgb(0 0 0 / 95%), rgb(0 0 0 / 97%)), url("${src}")`, "important")
    appRoot.style.setProperty("background-size", "cover", "important")
    appRoot.style.setProperty("background-position", "center top", "important")
    appRoot.style.setProperty("background-attachment", "scroll", "important")
    appRoot.style.setProperty("background-repeat", "no-repeat", "important")
    if (content) {
      content.dataset.svScene = src
      content.classList.add("sv-v0-scene")
      content.style.setProperty("background-image", "none", "important")
      content.style.setProperty("background-color", "transparent", "important")
    }
  }
  updateScene()
  installComposerEnhancements(doc)
  installNarratorMemoryBridge(doc)
  hideCharacterSecret(doc)
  syncAutoMemory(doc)
  renameInvestigationButtons(doc)
  compactProfileActions(doc)
  tuneMobileCopy(doc)

  const portraitDialog = doc.createElement("dialog")
  portraitDialog.className = "sv-v0-portrait-picker"
  portraitDialog.setAttribute("aria-label", "Escolha um retrato para a ficha")
  const portraitHeader = doc.createElement("div")
  portraitHeader.className = "sv-v0-dialog-head"
  const portraitTitle = doc.createElement("h2")
  portraitTitle.textContent = "Escolha o retrato"
  const closePortraits = doc.createElement("button")
  closePortraits.className = "sv-v0-close"
  closePortraits.type = "button"
  closePortraits.textContent = "FECHAR"
  closePortraits.addEventListener("click", () => portraitDialog.close())
  portraitHeader.append(portraitTitle, closePortraits)
  const portraitGrid = doc.createElement("div")
  portraitGrid.className = "sv-v0-portrait-grid"
  for (const portrait of portraits) {
    const choice = doc.createElement("button")
    choice.type = "button"
    choice.className = "sv-v0-portrait-choice"
    choice.setAttribute("aria-label", `Selecionar retrato: ${portrait.name}`)
    const image = doc.createElement("img")
    image.src = portrait.src
    image.alt = ""
    image.loading = "lazy"
    const label = doc.createElement("span")
    label.textContent = portrait.name
    choice.append(image, label)
    choice.addEventListener("click", () => {
      try {
        doc.defaultView?.localStorage.setItem(`sv-retrato:${getActiveSlug(doc)}`, portrait.src)
      } catch {
        // A escolha continua aplicada à ficha atual mesmo se o armazenamento estiver indisponível.
      }
      applyPortrait(portrait.src, portrait.name)
      portraitDialog.close()
    })
    portraitGrid.append(choice)
  }
  portraitDialog.append(portraitHeader, portraitGrid)
  doc.body.append(portraitDialog)

  const applyPortrait = (src: string, alt: string) => {
    const button = doc.querySelector<HTMLButtonElement>(".svr-foto")
    if (!button || button.querySelector(".sv-v0-portrait")?.getAttribute("src") === src) return
    button.querySelector(".svr-clip")?.remove()
    button.querySelector(".svr-vazio")?.remove()
    const image = doc.createElement("img")
    image.className = "sv-v0-portrait"
    image.src = src
    image.alt = alt
    image.dataset.portrait = "true"
    button.prepend(image)
  }
  const restorePortrait = () => {
    let src = ""
    try {
      src = doc.defaultView?.localStorage.getItem(`sv-retrato:${getActiveSlug(doc)}`) ?? ""
    } catch {
      return
    }
    if (src) applyPortrait(src, "Retrato selecionado para a ficha")
  }

  const playlistDialog = doc.createElement("dialog")
  playlistDialog.className = "sv-v0-playlist"
  playlistDialog.setAttribute("aria-label", "Lista de trilhas sonoras")
  const playlistHeader = doc.createElement("div")
  playlistHeader.className = "sv-v0-dialog-head"
  const playlistTitle = doc.createElement("h2")
  playlistTitle.textContent = "Trilha sonora · Saint Village"
  const closePlaylist = doc.createElement("button")
  closePlaylist.className = "sv-v0-close"
  closePlaylist.type = "button"
  closePlaylist.textContent = "FECHAR"
  closePlaylist.addEventListener("click", () => playlistDialog.close())
  playlistHeader.append(playlistTitle, closePlaylist)
  const trackList = doc.createElement("div")
  trackList.className = "sv-v0-track-list"
  playlistDialog.append(playlistHeader, trackList)
  doc.body.append(playlistDialog)

  const audio = doc.createElement("audio")
  audio.preload = "none"
  audio.volume = 0.7
  doc.body.append(audio)
  let trackIndex = 0
  const updateTrackLabels = () => {
    const track = tracks[trackIndex]
    const title = doc.querySelector<HTMLElement>(".svs-title")
    const artist = doc.querySelector<HTMLElement>(".svs-art")
    if (title) title.textContent = `${track.title}  ·  ${track.artist}`
    if (artist) artist.textContent = track.artist
    trackList.querySelectorAll<HTMLButtonElement>(".sv-v0-track").forEach((button, index) => {
      if (index === trackIndex) button.setAttribute("aria-current", "true")
      else button.removeAttribute("aria-current")
    })
  }
  const setTrack = (index: number, shouldPlay: boolean) => {
    trackIndex = (index + tracks.length) % tracks.length
    audio.pause()
    audio.src = tracks[trackIndex].src
    audio.load()
    updateTrackLabels()
    if (shouldPlay) {
      void audio.play().then(() => setStatus(true)).catch(() => {
        const status = doc.querySelector<HTMLElement>(".svs-st")
        if (status) status.textContent = "Não foi possível tocar"
      })
    }
  }
  tracks.forEach((track, index) => {
    const item = doc.createElement("button")
    item.type = "button"
    item.className = "sv-v0-track"
    item.setAttribute("aria-label", `Tocar ${track.title}, ${track.artist}`)
    const number = doc.createElement("span")
    number.className = "sv-v0-track-num"
    number.textContent = String(index + 1).padStart(2, "0")
    const description = doc.createElement("span")
    const title = doc.createElement("span")
    title.className = "sv-v0-track-title"
    title.textContent = track.title
    const artist = doc.createElement("span")
    artist.className = "sv-v0-track-artist"
    artist.textContent = track.artist
    description.append(title, artist)
    item.append(number, description)
    item.addEventListener("click", () => {
      setTrack(index, true)
      playlistDialog.close()
    })
    trackList.append(item)
  })

  const expandButton = doc.createElement("button")
  expandButton.type = "button"
  expandButton.className = "sv-v0-expand"
  expandButton.setAttribute("aria-label", "Abrir controles da trilha sonora")
  expandButton.setAttribute("aria-expanded", "false")
  expandButton.textContent = "♫"
  expandButton.addEventListener("click", () => {
    doc.querySelector(".svs")?.classList.remove("cl")
    expandButton.setAttribute("aria-expanded", "true")
  })

  const listButton = doc.createElement("button")
  listButton.type = "button"
  listButton.className = "svs-b sv-v0-list-button"
  listButton.setAttribute("aria-label", "Abrir lista de faixas")
  listButton.textContent = "LISTA"
  listButton.addEventListener("click", () => playlistDialog.showModal())
  const ensurePlayerControls = () => {
    const player = doc.querySelector<HTMLElement>(".svs")
    const controls = doc.querySelector(".svs-ctl")
    const volumeButton = doc.querySelector(".svs-vbtn")
    if (player && !player.querySelector(".sv-v0-expand")) player.prepend(expandButton)
    if (controls && !controls.querySelector(".sv-v0-list-button")) controls.insertBefore(listButton, volumeButton)
  }
  ensurePlayerControls()

  const setStatus = (playing: boolean) => {
    const status = doc.querySelector<HTMLElement>(".svs-st")
    const playButton = doc.querySelector<HTMLButtonElement>(".svs-play")
    const label = playing ? "Tocando agora" : "Em pausa"
    if (status && status.textContent !== label) status.textContent = label
    if (playButton && playButton.getAttribute("aria-label") !== (playing ? "Pausar" : "Tocar")) {
      playButton.setAttribute("aria-label", playing ? "Pausar" : "Tocar")
    }
  }
  audio.addEventListener("play", () => setStatus(true))
  audio.addEventListener("playing", () => setStatus(true))
  audio.addEventListener("timeupdate", () => setStatus(!audio.paused))
  audio.addEventListener("pause", () => setStatus(false))
  audio.addEventListener("ended", () => setTrack(trackIndex + 1, true))
  setTrack(0, false)
  setStatus(false)

  doc.addEventListener("click", (event) => {
    const target = event.target as Element | null
    if (!target?.closest) return
    const portraitButton = target.closest(".svr-foto")
    if (portraitButton) {
      event.preventDefault()
      event.stopImmediatePropagation()
      restorePortrait()
      portraitDialog.showModal()
      return
    }

    const button = target.closest("button")
    if (!button) return
    if (button.classList.contains("sv-play") || button.classList.contains("svs-play")) {
      event.preventDefault()
      event.stopImmediatePropagation()
      if (audio.paused) void audio.play().catch(() => setStatus(false))
      else audio.pause()
    } else if (button.classList.contains("svs-next")) {
      event.preventDefault()
      event.stopImmediatePropagation()
      setTrack(trackIndex + 1, true)
    } else if (button.classList.contains("svs-prev")) {
      event.preventDefault()
      event.stopImmediatePropagation()
      setTrack(trackIndex - 1, true)
    } else if (button.classList.contains("svs-vbtn") || button.classList.contains("svs-mute")) {
      event.preventDefault()
      event.stopImmediatePropagation()
      audio.muted = !audio.muted
      button.setAttribute("aria-label", audio.muted ? "Ativar som" : "Silenciar")
      button.setAttribute("aria-pressed", String(audio.muted))
    }
  }, true)

  doc.addEventListener("click", (event) => {
    const target = event.target as Element | null
    const tab = target?.closest<HTMLElement>(".sv-tab")
    if (tab) doc.defaultView?.setTimeout(updateScene, 0)
  })

  const observer = new MutationObserver(() => {
    updateScene()
    restorePortrait()
    ensurePlayerControls()
    ensureComposerInstructions(doc)
    installNarratorMemoryBridge(doc)
    hideCharacterSecret(doc)
    syncAutoMemory(doc)
    renameInvestigationButtons(doc)
    compactProfileActions(doc)
    tuneMobileCopy(doc)
    setStatus(!audio.paused)
  })
  observer.observe(doc.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-selected", "open"] })
  restorePortrait()
}
