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

export const getMember = async (id: string): Promise<MemberModel | undefined> => {
  return await dbPromise.get('members', id)
}

export const deleteMember = async (id: string): Promise<void> => {
  await dbPromise.delete('members', id)
}

export const getAllMembers = async (): Promise<MemberModel[]> => {
  return await dbPromise.getAll('members')
}
