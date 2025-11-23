import { useCookieStore } from './useCookieStore'

export function useMemberPhoneNoStore() {
  const { getCookie, setCookie } = useCookieStore()
  const COOKIE_PHONE_NO = 'member_phoneNo'

  const getMemberPhoneNo = (): string | undefined => {
    return getCookie(COOKIE_PHONE_NO)
  }

  const setMemberPhoneNo = (phoneNo: string) => {
    setCookie(COOKIE_PHONE_NO, phoneNo)
  }

  return { setMemberPhoneNo, getMemberPhoneNo }
}
