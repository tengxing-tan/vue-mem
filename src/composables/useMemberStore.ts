import type { MemberModel } from '@/models/member.model'
import { addOrUpdateMember, deleteMember, getAllMembers } from '@/services/member.service'
import { ref, onMounted } from 'vue'

export function useMemberFormStore() {
  const phoneNoMaxLength = 20
  return { phoneNoMaxLength }
}

export function useMemberInitStore() {
  const members = ref<MemberModel[]>([])

  onMounted(() => {
    getAllMembers().then((membersData) => (members.value = membersData))
  })

  return { members }
}

export function useMemberGetStore() {
  const member = ref<MemberModel | undefined>()
  const members = ref<MemberModel[]>()
  const phoneNoSearchKey = ref<string>('')

  const setPhoneNoSearchKey = (phoneNo: string) => {
    phoneNoSearchKey.value = phoneNo
  }

  const getMemberByPhoneNo = (phoneNo: string): MemberModel | undefined => {
    return members.value?.find((member) => member.phoneNo === phoneNo)
  }

  onMounted(async (): Promise<void> => {
    members.value = await getAllMembers()
    member.value = getMemberByPhoneNo(phoneNoSearchKey.value)
  })

  return { member, getMemberByPhoneNo, setPhoneNoSearchKey }
}

export function useMemberAddOrUpdateStore() {
  const { getMemberByPhoneNo } = useMemberGetStore()

  const handleUpdateMember = async (updateMember: MemberModel) => {
    if (!getMemberByPhoneNo(updateMember.phoneNo)) {
      alert('Member does not exist: ' + updateMember.phoneNo)
    }

    await addOrUpdateMember(updateMember, false)
  }

  const handleCreateMember = async (newMember: MemberModel) => {
    if (newMember.phoneNo.trim() === '') return
    await addOrUpdateMember(newMember, true)
  }

  return { handleUpdateMember, handleCreateMember }
}

export function useMemberDeleteStore() {
  const { getMemberByPhoneNo } = useMemberGetStore()

  const { handleUpdateMember } = useMemberAddOrUpdateStore()
  const handleDeleteMember = async (phoneNo: string) => {
    const member = getMemberByPhoneNo(phoneNo)
    if (member) {
      handleUpdateMember({ ...member, isDeleted: true })
    }
  }

  const deleteMemberPermanently = async (phoneNo: string) => {
    const member = getMemberByPhoneNo(phoneNo)
    if (member) {
      await deleteMember(member.phoneNo)
    }
  }

  return { handleDeleteMember, deleteMemberPermanently }
}
