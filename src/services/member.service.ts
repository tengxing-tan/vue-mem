// src/db/memberDb.ts

import type { MemberModel } from '@/models/member.model'
import { dbPromise } from './db'

type DataModel = MemberModel
type PrimaryKey = string

export const addOrUpdateMember = async (data: DataModel, isNew: boolean): Promise<void> => {
  try {
    await dbPromise.put(
      'members',
      JSON.parse(
        JSON.stringify({
          ...data,
          createdAt: isNew ? new Date() : data.createdAt,
          updatedAt: new Date(),
          isDeleted: data.isDeleted || false,
        }),
      ),
    )
  } catch (error) {
    alert('Failed to add or update member:' + error)
    throw error
  }
}

export const getMember = async (primaryKey: PrimaryKey): Promise<MemberModel | undefined> => {
  return await dbPromise.get('members', primaryKey)
}

export const deleteMember = async (primaryKey: PrimaryKey): Promise<void> => {
  await dbPromise.delete('members', primaryKey)
}

export const getAllMembers = async (count?: number): Promise<DataModel[]> => {
  return await dbPromise.getAll('members', undefined, count)
}
