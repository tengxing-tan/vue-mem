import type { SettingModel } from '@/models/setting.model'
import { createStoreRepository } from './idb-repo'
import { toast } from './toast'
import { logger } from './logger'

const repo = createStoreRepository<SettingModel, string>('settings')

export const getCompanyEmail = async (email: string): Promise<SettingModel | undefined> => {
  return await repo.get(email)
}

export const setCompanyEmail = async (email: string, value: string): Promise<void> => {
  try {
    await repo.put({ key: email, value } as SettingModel)
  } catch (error) {
    logger.error('Failed to set company email', error, {
      module: 'setting.service',
      meta: { email },
    })
    toast.error('Failed to update company email. Please try again.')
    throw error
  }
}
