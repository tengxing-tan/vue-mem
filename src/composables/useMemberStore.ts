import type { MemberModel } from '@/models/member.model'
import {
  addOrUpdateMember,
  getAllMembers,
  getMember,
  deleteMember,
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
      members.value = await getAllMembers()
      loaded.value = true
    }
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

  async function deleteMemberFromIdb(phoneNo: string) {
    await deleteMember(phoneNo)
  }

  return {
    lazyLoadMemberData,
    findMember,
    findMemberInIdb,
    upsertMember,
    deleteMemberFromIdb,
    members,
  }
}
