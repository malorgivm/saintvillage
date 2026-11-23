'use client'

import { installPlatformEnhancements } from "./platform-enhancements"
import { AuthGate } from "@/components/auth-gate"

const noirAccentStyles = `
  :root, .sv-frost, .sv-guide, .sv-content {
    --sv-accent: #d4d4d4 !important;
    --sv-accent-soft: #aaaaaa !important;
    --sv-ink2: #d4d4d4 !important;
    --sv-title: #f3f3f3 !important;
  }
  .sv-nl,
  .sv-hdr [aria-label="Saint Village"] {
    color: #fff !important;
    text-shadow: 0 0 2px #fff, 0 0 8px rgb(255 255 255 / 42%), 0 0 18px rgb(255 255 255 / 20%) !important;
    animation: sv-logo-glow 4s linear infinite;
  }
  .sv-login { border-top-color: #d4d4d4 !important; }
  .sv-guide-n,
  .sv-content [style*="--sv-accent"],
  .sv-content [style*="--sv-accent-soft"] {
    border-color: rgb(212 212 212 / 55%) !important;
    color: #d4d4d4 !important;
  }
  .sv-guide-step.done .sv-guide-n,
  .sv-tab[aria-selected="true"],
  .sv-tab[aria-selected="true"] .sv-tab-lbl,
  .sv-content [aria-selected="true"],
  .sv-content [aria-pressed="true"],
  .sv-content [data-cur="true"] {
    border-color: #d4d4d4 !important;
    color: #f3f3f3 !important;
  }
  .sv-content button:hover,
  .sv-content button:focus-visible,
  .sv-login input:focus-visible {
    border-color: #d4d4d4 !important;
    color: #f3f3f3 !important;
    outline-color: #d4d4d4 !important;
  }
  @keyframes sv-logo-glow {
    0%, 100% { opacity: .96; }
    25% { opacity: .985; }
    50% { opacity: 1; }
    75% { opacity: .985; }
  }
  @media (prefers-reduced-motion: reduce) {
    .sv-nl, .sv-hdr [aria-label="Saint Village"] { animation: none; }
  }
`

export default function Page() {
  return (
    <AuthGate>
      <main className="h-full w-full overflow-hidden bg-black">
        <iframe
          src="/reference-platform.html"
          title="Saint Village 1934"
          aria-label="Plataforma Saint Village 1934"
          allow="autoplay"
          onLoad={(event) => {
            const doc = event.currentTarget.contentDocument
            if (!doc?.head) return
            if (!doc.getElementById('sv-noir-accent-styles')) {
              const style = doc.createElement('style')
              style.id = 'sv-noir-accent-styles'
              style.textContent = noirAccentStyles
              doc.head.append(style)
            }
            installPlatformEnhancements(doc)
          }}
          className="h-full w-full border-0"
        />
      </main>
    </AuthGate>
  )
}
