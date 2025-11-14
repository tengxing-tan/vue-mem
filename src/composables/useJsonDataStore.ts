import { useMemberStore } from './useMemberStore'

export function useJsonDataStore() {
  const { members } = useMemberStore()

  const getAllMembersInJson = () => {
    return JSON.stringify(members.value, null, 2)
  }

  return { getAllMembersInJson }
}
