import type { MemberModel } from '@/models/member.model'
import { addOrUpdateMember, deleteMember, getAllMembers } from '@/services/member.service'
import { ref, onMounted } from 'vue'

export function useMemberStore() {
  const members = ref<MemberModel[]>([])
  const loading = ref<boolean>(true)
  const creating = ref<boolean>(false)
  const editing = ref<boolean>(false)

  const loadMembers = async (): Promise<void> => {
    loading.value = true
    members.value = await getAllMembers()
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

  const removeMember = async (id: string): Promise<void> => {
    await deleteMember(id)
    await loadMembers()
  }

  const editingMember = ref<MemberModel | null>(null)

  onMounted(() => {
    loadMembers()
  })

  return {
    members,
    loading,
    loadMembers,
    creating,
    saveMember,
    editing,
    editingMember,
    removeMember,
  }
}
