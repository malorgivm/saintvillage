'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from 'react'
import useSWR, { useSWRConfig } from 'swr'
import type { User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

const SESSION_KEY = 'saint-village-auth-session'
const OWNER_KEY = 'sv-auth-owner'
const PROFILE_LIST_KEY = 'sv-perfis'
const CURRENT_PROFILE_KEY = 'sv-perfil-atual'
const SAVE_PREFIX = 'sv-cronica-v2'
const SAVE_PROFILE_PREFIX = `${SAVE_PREFIX}::`
const REDIRECT_URL = process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL

type SavedProfile = { name: string; save: string | null }
type GameSnapshot = { version: 1; currentProfile: string | null; profiles: Record<string, SavedProfile> }
type ProfileLabel = { slug: string; nome: string }

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

function isGameSnapshot(value: unknown): value is GameSnapshot {
  if (!value || typeof value !== 'object') return false
  const snapshot = value as Partial<GameSnapshot>
  return snapshot.version === 1 && !!snapshot.profiles && typeof snapshot.profiles === 'object'
}

function clearGameStorage() {
  const keys = Object.keys(localStorage)
  for (const key of keys) {
    if (key === PROFILE_LIST_KEY || key === CURRENT_PROFILE_KEY || key === SAVE_PREFIX || key.startsWith(SAVE_PROFILE_PREFIX)) {
      localStorage.removeItem(key)
    }
  }
}

function readLocalSnapshot(): GameSnapshot {
  const profiles = parseJson<ProfileLabel[]>(localStorage.getItem(PROFILE_LIST_KEY), [])
  const current = parseJson<{ slug?: string; nome?: string } | null>(localStorage.getItem(CURRENT_PROFILE_KEY), null)
  const names = new Map<string, string>()

  for (const profile of profiles) {
    if (profile && typeof profile.slug === 'string') names.set(profile.slug, profile.nome || profile.slug)
  }
  if (current?.slug) names.set(current.slug, current.nome || names.get(current.slug) || current.slug)

  for (const key of Object.keys(localStorage)) {
    if (key.startsWith(SAVE_PROFILE_PREFIX)) {
      const slug = key.slice(SAVE_PROFILE_PREFIX.length)
      if (slug) names.set(slug, names.get(slug) || slug)
    }
  }

  if (current?.slug && !localStorage.getItem(`${SAVE_PROFILE_PREFIX}${current.slug}`)) {
    const legacySave = localStorage.getItem(SAVE_PREFIX)
    if (legacySave) localStorage.setItem(`${SAVE_PROFILE_PREFIX}${current.slug}`, legacySave)
  }

  const savedProfiles: GameSnapshot['profiles'] = {}
  for (const [slug, name] of names) {
    savedProfiles[slug] = { name, save: localStorage.getItem(`${SAVE_PROFILE_PREFIX}${slug}`) }
  }

  return { version: 1, currentProfile: current?.slug ?? null, profiles: savedProfiles }
}

function applySnapshot(snapshot: GameSnapshot) {
  clearGameStorage()
  const profiles = Object.entries(snapshot.profiles).map(([slug, profile]) => ({ slug, nome: profile.name || slug }))
  localStorage.setItem(PROFILE_LIST_KEY, JSON.stringify(profiles))

  for (const [slug, profile] of Object.entries(snapshot.profiles)) {
    if (typeof profile.save === 'string') localStorage.setItem(`${SAVE_PROFILE_PREFIX}${slug}`, profile.save)
  }

  if (snapshot.currentProfile) {
    const current = snapshot.profiles[snapshot.currentProfile]
    if (current) localStorage.setItem(CURRENT_PROFILE_KEY, JSON.stringify({ slug: snapshot.currentProfile, nome: current.name }))
  }
}

function getAuthMessage(error: unknown) {
  const message = error instanceof Error ? error.message.toLowerCase() : ''
  if (/invalid login credentials|user already registered|email address.*already/.test(message)) {
    return 'E-mail ou senha inválidos. Confira os dados e tente novamente.'
  }
  if (/email not confirmed/.test(message)) return 'Confirme seu e-mail pelo link enviado antes de entrar.'
  if (/rate limit|too many requests/.test(message)) return 'Muitas tentativas em pouco tempo. Aguarde um momento e tente novamente.'
  if (/weak password|password should be at least/.test(message)) return 'Use uma senha mais forte, com pelo menos 8 caracteres.'
  if (/email_address_invalid|invalid email/.test(message)) return 'Digite um endereço de e-mail válido.'
  return 'Não foi possível concluir a solicitação. Tente novamente.'
}

function AuthLoading({ label }: { label: string }) {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-[#09090a] px-6 text-center text-sm text-white/60" role="status">
      <span className="mr-3 inline-block size-2 animate-pulse rounded-full bg-white/70" />
      {label}
    </div>
  )
}

function LoginScreen({ onAuthenticated }: { onAuthenticated: (user: User) => void }) {
  const supabase = useMemo(() => createClient(), [])
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError('')
    setNotice('')

    try {
      if (mode === 'login') {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
        if (authError) throw authError
        if (data.user) onAuthenticated(data.user)
        return
      }

      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: REDIRECT_URL ?? `${window.location.origin}/auth/callback` },
      })
      if (authError) throw authError
      if (data.session && data.user) onAuthenticated(data.user)
      else setNotice('Conta criada. Confira sua caixa de entrada e confirme o e-mail para começar a salvar suas histórias.')
    } catch (authError) {
      setError(getAuthMessage(authError))
    } finally {
      setPending(false)
    }
  }

  return (
    <main className="grain relative flex min-h-dvh items-center justify-center overflow-x-hidden overflow-y-auto bg-[#09090a] px-4 py-8 text-[#e5e5e5] sm:px-6 sm:py-12">
      <style>{`@keyframes sv-auth-logo-glow { 0%, 100% { opacity: .96; } 25%, 75% { opacity: .985; } 50% { opacity: 1; } } .sv-auth-logo { color: #fff; text-shadow: 0 0 2px #fff, 0 0 8px rgb(255 255 255 / 42%), 0 0 18px rgb(255 255 255 / 20%); animation: sv-auth-logo-glow 4s linear infinite; } @media (prefers-reduced-motion: reduce) { .sv-auth-logo { animation: none; } }`}</style>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.48),rgba(0,0,0,.82)),url('/fundos/noir5.jpg')] bg-cover bg-center opacity-75" aria-hidden="true" />
      <div className="relative z-10 w-full max-w-[440px]">
        <header className="mb-8 px-2 text-center sm:mb-10">
          <h1 id="auth-title" className="sv-auth-logo whitespace-nowrap text-[clamp(2.7rem,5.8vw,4rem)] leading-[.88] tracking-[0.04em]" style={{ fontFamily: 'var(--font-bebas), Impact, sans-serif' }}>Saint Village</h1>
        </header>

        <section className="mx-auto w-full px-5 py-5 sm:px-7 sm:py-6" aria-labelledby="auth-form-title">
          <div className="mb-5 border-b border-white/15 pb-4">
            <h2 id="auth-form-title" className="font-display text-lg tracking-[0.18em] text-white sm:text-xl">{mode === 'login' ? 'QUEM ESTÁ INVESTIGANDO?' : 'ABRA SEU ARQUIVO'}</h2>
          </div>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="auth-email" className="font-display text-xs tracking-[0.16em] text-white/75">E-MAIL</label>
              <input id="auth-email" name="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="min-h-11 w-full border border-white/25 bg-black/75 px-4 font-sans text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-white focus-visible:ring-2 focus-visible:ring-white/40" placeholder="detetive@exemplo.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="auth-password" className="font-display text-xs tracking-[0.16em] text-white/75">SENHA</label>
              <input id="auth-password" name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} className="min-h-11 w-full border border-white/25 bg-black/75 px-4 font-sans text-base text-white outline-none transition-colors placeholder:text-white/40 focus:border-white focus-visible:ring-2 focus-visible:ring-white/40" placeholder={mode === 'signup' ? 'Mínimo de 8 caracteres' : 'Sua senha'} />
            </div>

            {error && <p className="border-l-2 border-white/70 bg-white/10 px-3 py-3 text-sm leading-relaxed text-white" role="alert">{error}</p>}
            {notice && <p className="border-l-2 border-white/70 bg-white/10 px-3 py-3 text-sm leading-relaxed text-white" role="status">{notice}</p>}

            <button type="submit" disabled={pending} className="mt-1 min-h-12 w-full bg-[#e5e5e5] px-4 font-display text-sm font-semibold tracking-[0.2em] text-black transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-wait disabled:opacity-60">
              {pending ? 'AGUARDE…' : mode === 'login' ? 'ENTRAR NO ARQUIVO' : 'CRIAR CONTA'}
            </button>
          </form>

          <div className="mt-5 border-t border-white/15 pt-4 text-center font-sans text-sm text-white/65">
            {mode === 'login' ? 'Primeira vez por aqui?' : 'Já tem um arquivo?'}{' '}
            <button type="button" onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError(''); setNotice('') }} className="min-h-10 px-1 font-semibold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
              {mode === 'login' ? 'Criar conta' : 'Entrar'}
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}

export function AuthGate({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), [])
  const { mutate } = useSWRConfig()
  const [hydratedUserId, setHydratedUserId] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState('')
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const { data: session, error: sessionError, isLoading: sessionLoading, mutate: mutateSession } = useSWR(
    SESSION_KEY,
    async () => {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error
      return data.session
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )
  const user = session?.user ?? null
  const activeUserId = useRef<string | null>(null)
  const hydratedSnapshotUserId = useRef<string | null>(null)
  activeUserId.current = user?.id ?? null
  const { data: remoteSnapshot, error: loadError, isLoading: saveLoading, mutate: mutateSave } = useSWR<GameSnapshot | null>(

    user ? ['game-save', user.id] as const : null,
    async ([, userId]) => {
      const { data, error } = await supabase.from('game_saves').select('save_data').eq('user_id', userId).maybeSingle()
      if (error) throw error
      const value: unknown = data?.save_data ?? null
      if (value === null) return null
      if (isGameSnapshot(value)) return value
      if (typeof value === 'object' && value !== null && Object.keys(value).length === 0) return null
      throw new Error('Invalid game save format')
    },
    { revalidateOnFocus: false, shouldRetryOnError: false },
  )

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (activeUserId.current !== (nextSession?.user.id ?? null)) {
        hydratedSnapshotUserId.current = null
        setHydratedUserId(null)
      }
      void mutate(SESSION_KEY, nextSession, { revalidate: false })
    })
    return () => listener.subscription.unsubscribe()
  }, [mutate, supabase])

  useEffect(() => {
    if (sessionError) setSaveStatus('Não foi possível verificar sua sessão. Tente recarregar a página.')
  }, [sessionError])

  useEffect(() => {
    if (!user || saveLoading || loadError || remoteSnapshot === undefined || hydratedSnapshotUserId.current === user.id) return

    hydratedSnapshotUserId.current = user.id
    const previousOwner = localStorage.getItem(OWNER_KEY)
    if (previousOwner && previousOwner !== user.id) clearGameStorage()

    if (remoteSnapshot) applySnapshot(remoteSnapshot)
    localStorage.setItem(OWNER_KEY, user.id)
    setHydratedUserId(user.id)
    setSaveStatus('')

    if (!remoteSnapshot) {
      const localSnapshot = readLocalSnapshot()
      if (Object.keys(localSnapshot.profiles).length > 0) {
        void supabase.from('game_saves').upsert(
          { user_id: user.id, save_data: localSnapshot, schema_version: 1, updated_at: new Date().toISOString() },
          { onConflict: 'user_id' },
        ).then(({ error }) => {
          if (error) setSaveStatus('Não foi possível sincronizar os dados antigos agora. Eles continuam neste dispositivo.')
          else void mutateSave(localSnapshot, { revalidate: false })
        })
      }
    }
  }, [user, remoteSnapshot, saveLoading, loadError, supabase, mutateSave])

  const persistCurrentSnapshot = useCallback(async (userId: string) => {
    const snapshot = readLocalSnapshot()
    const { error } = await supabase.from('game_saves').upsert(
      { user_id: userId, save_data: snapshot, schema_version: 1, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' },
    )
    if (error) {
      setSaveStatus('Falha ao salvar na nuvem. A crônica continua aberta neste dispositivo.')
      return false
    }
    await mutateSave(snapshot, { revalidate: false })
    setSaveStatus(`Salvo na nuvem às ${new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date())}`)
    return true
  }, [supabase, mutateSave])

  useEffect(() => {
    if (!user || hydratedUserId !== user.id) return

    const queueSave = () => {
      if (saveTimer.current) clearTimeout(saveTimer.current)
      saveTimer.current = setTimeout(() => void persistCurrentSnapshot(user.id), 1200)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === PROFILE_LIST_KEY || event.key === CURRENT_PROFILE_KEY || event.key === SAVE_PREFIX || event.key.startsWith(SAVE_PROFILE_PREFIX)) queueSave()
    }
    window.addEventListener('storage', onStorage)
    return () => {
      window.removeEventListener('storage', onStorage)
      if (saveTimer.current) clearTimeout(saveTimer.current)
    }
  }, [user, hydratedUserId, persistCurrentSnapshot])

  const handleAuthenticated = useCallback((_nextUser: User) => {
    void mutateSession()
  }, [mutateSession])

  async function handleSignOut() {
    if (!user) return
    if (saveTimer.current) clearTimeout(saveTimer.current)
    if (loadError) {
      const { error } = await supabase.auth.signOut()
      if (!error) {
        setHydratedUserId(null)
        await mutateSession(null, { revalidate: false })
      }
      return
    }

    const saved = await persistCurrentSnapshot(user.id)
    if (!saved) return
    const { error } = await supabase.auth.signOut()
    if (!error) {
      clearGameStorage()
      localStorage.removeItem(OWNER_KEY)
      setHydratedUserId(null)
      setSaveStatus('')
      await mutateSession(null, { revalidate: false })
    }
  }

  if (sessionLoading) return <AuthLoading label="Abrindo seu arquivo…" />
  if (sessionError) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#09090a] px-6 text-center text-white" role="alert">
        <p className="max-w-sm font-sans text-sm leading-relaxed text-white/70">Não foi possível verificar sua sessão agora.</p>
        <button type="button" onClick={() => void mutateSession()} className="border border-white/30 px-4 py-3 font-display text-xs tracking-widest hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">TENTAR NOVAMENTE</button>
      </main>
    )
  }

  if (!user) return <LoginScreen onAuthenticated={handleAuthenticated} />
  if (loadError) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-[#09090a] px-6 text-center text-white">
        <p className="max-w-sm font-sans text-sm leading-relaxed text-white/70">Não foi possível abrir sua crônica na nuvem. Verifique a conexão e tente novamente.</p>
        <button type="button" onClick={() => void mutateSave()} className="border border-white/30 px-4 py-3 font-display text-xs tracking-widest hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">TENTAR NOVAMENTE</button>
        <button type="button" onClick={() => void handleSignOut()} className="text-xs text-white/50 underline underline-offset-4">Sair da conta</button>
      </main>
    )
  }
  if (saveLoading || hydratedUserId !== user.id) return <AuthLoading label="Buscando sua crônica…" />

  return (
    <div className="relative h-dvh w-screen overflow-hidden bg-black">
      <header className="absolute inset-x-0 top-0 z-[70] flex h-9 items-center justify-between border-b border-white/10 bg-black px-3 text-white/65">
        <span className="truncate font-sans text-[10px]" title={user.email ?? undefined}>{saveStatus || 'ARQUIVO PRIVADO · SINCRONIZAÇÃO AUTOMÁTICA'}</span>
        <button type="button" onClick={() => void handleSignOut()} className="ml-3 shrink-0 px-2 py-1 font-display text-[10px] tracking-[0.12em] text-white/75 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">SAIR</button>
      </header>
      <div className="absolute inset-x-0 bottom-0 top-9">{children}</div>
    </div>
  )
}
