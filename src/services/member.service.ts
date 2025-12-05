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

// Index helpers
export const getMembersUpdatedSince = async (date: Date, limit?: number): Promise<DataModel[]> => {
  const range = IDBKeyRange.lowerBound(date, true) // strictly after
  const results = await repo.getByIndex('updatedAtIdx', range)
  return typeof limit === 'number' ? results.slice(-limit) : results
}

export const getMembersBetween = async (
  start: Date,
  end: Date,
  limit?: number,
): Promise<DataModel[]> => {
  const range = IDBKeyRange.bound(start, end, true, true) // exclusive bounds
  const results = await repo.getByIndex('updatedAtIdx', range)
  return typeof limit === 'number' ? results.slice(0, limit) : results
}

export const getRecentMembers = async (limit: number): Promise<DataModel[]> => {
  // Fetch all by index and take last N (assuming ascending order by updatedAt)
  const results = await repo.getByIndex('updatedAtIdx', IDBKeyRange.lowerBound(new Date(0)))
  return results.slice(-limit)
}
