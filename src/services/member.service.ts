// src/db/memberDb.ts

import type { MemberModel } from '@/models/member.model'
import { dbPromise } from './db'
export const addOrUpdateMember = async (member: MemberModel): Promise<void> => {
  try {
    const isMemberExists = member.id.length !== 0 && (await dbPromise.get('members', member.id))
    member.updatedAt = new Date()

    await dbPromise.put(
      'members',
      JSON.parse(
        JSON.stringify({
          ...member,
          id: member.id || crypto.randomUUID(),
          createdAt: !isMemberExists || new Date(),
          updatedAt: new Date(),
        }),
      ),
    )
  } catch (error) {
    console.log('Failed to add or update member:', error)
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
