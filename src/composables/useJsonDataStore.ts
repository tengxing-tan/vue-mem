import { useMemberInitStore } from './useMemberStore'

export function useJsonDataStore() {
  const { members } = useMemberInitStore()

  const getAllMembersInJson = () => {
    return JSON.stringify(members.value, null, 2)
  }

  return { getAllMembersInJson }
}
