// src/db/memberDb.ts

import type { MemberModel } from '@/models/member.model'
import { dbPromise } from './db'
export const addOrUpdateMember = async (member: MemberModel, isNew: boolean): Promise<void> => {
  try {
    await dbPromise.put(
      'members',
      JSON.parse(
        JSON.stringify({
          ...member,
          createdAt: isNew ? new Date() : member.createdAt,
          updatedAt: new Date(),
          isDeleted: member.isDeleted || false,
        }),
      ),
    )
  } catch (error) {
    alert('Failed to add or update member:' + error)
    throw error
  }
}

export const getMember = async (phoneNo: string): Promise<MemberModel | undefined> => {
  return await dbPromise.get('members', phoneNo)
}

export const deleteMember = async (phoneNo: string): Promise<void> => {
  await dbPromise.delete('members', phoneNo)
}

export const getAllMembers = async (): Promise<MemberModel[]> => {
  return await dbPromise.getAll('members')
}
