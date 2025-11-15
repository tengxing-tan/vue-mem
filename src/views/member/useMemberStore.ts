import type { MemberModel } from '@/models/member.model'
import {
  addOrUpdateMember,
  getMember,
  deleteMember,
  getAllMembers,
} from '@/services/member.service'
import { ref } from 'vue'

export function useMemberFormStore() {
  const phoneNoMaxLength = 20
  return { phoneNoMaxLength }
}

export function useMemberStore() {
  const members = ref<MemberModel[]>([])
  const loaded = ref(false)
  const lazyLoadMemberData = async () => {
    if (!loaded.value) {
      const allMembers = await getAllMembers(100)
      members.value = allMembers.sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
      loaded.value = true
    }
  }

  const loadAllMembers = async () => {
    const allMembers = await getAllMembers()
    members.value = allMembers.sort((a, b) => (b.updatedAt > a.updatedAt ? 1 : -1))
  }

  async function findMember(phoneNo: string): Promise<MemberModel | undefined> {
    await lazyLoadMemberData()
    return members.value?.find((m) => m.phoneNo === phoneNo)
  }

  async function findMemberInIdb(phoneNo: string): Promise<MemberModel | undefined> {
    return await getMember(phoneNo)
  }

  async function upsertMember(memberUpdate: MemberModel, isNew: boolean) {
    await addOrUpdateMember(memberUpdate, isNew)
  }

  async function deleteRowFromIdb(phoneNo: string) {
    await deleteMember(phoneNo)
  }

  return {
    lazyLoadMemberData,
    loadAllMembers,
    findMember,
    findMemberInIdb,
    upsertMember,
    deleteRowFromIdb,
    members,
  }
}
