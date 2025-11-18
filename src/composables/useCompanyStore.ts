export function useCompanyStore() {
  const COOKIE_MAX_AGE = 31536000
  function setCookie(name: string, value: string) {
    document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Lax`
  }
  function getCookie(name: string): string | undefined {
    const prefix = name + '='
    const part = document.cookie.split('; ').find((c) => c.startsWith(prefix))
    if (!part) return
    return decodeURIComponent(part.substring(prefix.length))
  }

  const COMPANY_ID = 'companyId'
  const COMPANY_EMAIL = 'companyEmail'

  function setCompanyId(id: number) {
    setCookie(COMPANY_ID, String(id))
  }
  function getCompanyId(): number | undefined {
    const raw = getCookie(COMPANY_ID)
    if (raw == null) return
    const n = Number(raw)
    return Number.isNaN(n) ? undefined : n
  }

  function setCompanyEmail(email: string) {
    setCookie(COMPANY_EMAIL, email)
  }
  function getCompanyEmail(): string | undefined {
    return getCookie(COMPANY_EMAIL)
  }

  return { setCompanyId, getCompanyId, setCompanyEmail, getCompanyEmail }
}
