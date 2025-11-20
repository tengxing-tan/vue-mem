export function useCookieStore() {
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

  return { setCookie, getCookie }
}
