// src/db/memberDb.ts

import type { MemberModel } from '@/models/member.model'
import { createStoreRepository } from './idb-repo'
import { toast } from './toast'
import { logger } from './logger'

type DataModel = MemberModel
type PrimaryKey = string

const repo = createStoreRepository<DataModel, PrimaryKey>('members')

export const addOrUpdateMember = async (data: DataModel, isNew: boolean): Promise<void> => {
  try {
    const payload: DataModel = {
      ...data,
      createdAt: isNew ? new Date() : data.createdAt,
      updatedAt: new Date(),
      isDeleted: data.isDeleted || false,
    }
    await repo.put(payload)
  } catch (error) {
    logger.error('Failed to add or update member', error, { module: 'member.service' })
    toast.error('Failed to save member. Please try again.')
    throw error
  }
}

export const getMember = async (primaryKey: PrimaryKey): Promise<MemberModel | undefined> => {
  return await repo.get(primaryKey)
}

export const deleteMember = async (primaryKey: PrimaryKey): Promise<void> => {
  await repo.delete(primaryKey)
}

export const getAllMembers = async (count?: number): Promise<DataModel[]> => {
  return await repo.getAll(count)
}
