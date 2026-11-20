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
  .sv-v0-scene { transition: background-image .35s ease; }
  html.sv-sideoff .svt-invite,
  html.sv-sideoff .sv-guia { display: none !important; }
  .sv-content .sv-log {
    min-height: 0 !important;
    max-height: max(220px, calc(100dvh - 245px)) !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    overscroll-behavior: contain;
  }
  html.sv-sideoff .sv-content .sv-log {
    max-height: max(220px, calc(100dvh - 245px)) !important;
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
  .svs.cl .sv-v0-expand { position: absolute; inset: 0; z-index: 2; display: grid; width: 40px; height: 40px; place-items: center; border: 0; border-radius: 50%; background: transparent; color: #f3f3f3; font-size: 18px; cursor: pointer; }
  @media (max-width: 600px) {
    .sv-v0-portrait-picker { padding: 16px; }
    .sv-v0-portrait-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
    .sv-v0-portrait-choice img { aspect-ratio: 1/1; }
    .svr-foto .sv-v0-portrait { min-height: 160px; }
  }
  @media (prefers-reduced-motion: reduce) { .sv-v0-scene { transition: none; } }
`

function getActiveSlug(doc: Document) {
  try {
    const profile = JSON.parse(doc.defaultView?.localStorage.getItem("sv-perfil-atual") ?? "null")
    return typeof profile?.slug === "string" ? profile.slug : "default"
  } catch {
    return "default"
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
    for (const target of [appRoot, content]) {
      if (!target) continue
      target.dataset.svScene = src
      target.classList.add("sv-v0-scene")
      target.style.setProperty("background-image", `linear-gradient(180deg, rgb(10 11 12 / 68%), rgb(10 11 12 / 84%)), url("${src}")`, "important")
      target.style.setProperty("background-size", "cover", "important")
      target.style.setProperty("background-position", "center top", "important")
      target.style.setProperty("background-attachment", "fixed", "important")
      target.style.setProperty("background-repeat", "no-repeat", "important")
    }
  }
  updateScene()

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
    setStatus(!audio.paused)
  })
  observer.observe(doc.body, { subtree: true, childList: true, attributes: true, attributeFilter: ["aria-selected", "open"] })
  restorePortrait()
}
