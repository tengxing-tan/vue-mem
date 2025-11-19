export function useMemberPhoneNoStore() {
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

  const MEMBER_CLIENT_PHONE_NO = 'member_client_phone_no'
  const MEMBER_COOKIE_ID = 'member_cookie_id'

  function setMemberClientPhoneNo(phoneNo: string) {
    setCookie(MEMBER_CLIENT_PHONE_NO, phoneNo)
    setCookie(MEMBER_COOKIE_ID, new Date().getTime().toString())
  }
  function getMemberClientPhoneNo(): string | undefined {
    return getCookie(MEMBER_CLIENT_PHONE_NO)
  }

  return { setMemberClientPhoneNo, getMemberClientPhoneNo }
}
