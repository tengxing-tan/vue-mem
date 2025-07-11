import type { MemberModel } from '@/models/member.model'
import {
  addOrUpdateMember,
  deleteMember,
  getAllMembers,
  getMember,
} from '@/services/member.service'
import { ref, onMounted } from 'vue'

export function useMemberStore() {
  const members = ref<MemberModel[]>([])
  const loading = ref<boolean>(true)
  const creating = ref<boolean>(false)
  const selection = ref<string[]>([])
  const member = ref<MemberModel | null>(null)

  const loadMembers = async (): Promise<void> => {
    loading.value = true
    if (members.value.length === 0) {
      members.value = await getAllMembers()
    }

    loading.value = false
  }

  const saveMember = async (member: MemberModel): Promise<void> => {
    // if (!phoneNoValidator(member.phoneNo)) {
    //   alert('Phone number should be like 0123456789')
    //   return
    // }

    if (
      member.id.length === 0 &&
      members.value.some((m: MemberModel) => m.phoneNo === member.phoneNo)
    ) {
      alert('Member with this phone number already exists')
      return
    }

    await addOrUpdateMember(member)
    await loadMembers()
    creating.value = false
  }

  const getMemberById = async (id: string): Promise<MemberModel | undefined> => {
    return await getMember(id)
  }

  const removeMember = async (id: string): Promise<void> => {
    await deleteMember(id)
    await loadMembers()
  }

  const removeSelectedMembers = async (): Promise<void> => {
    if (selection.value.length === 0) {
      return
    }

    for (const id of selection.value) {
      await deleteMember(id)
    }
    selection.value = []
    await loadMembers()
  }

  return {
    member,
    members,
    loading,
    loadMembers,
    creating,
    saveMember,
    getMemberById,
    removeMember,
    selection,
    removeSelectedMembers,
  }
}
