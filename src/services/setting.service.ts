import type { SettingModel } from '@/models/setting.model'
import { dbPromise } from './db'

export const getCompanyEmail = async (email: string): Promise<SettingModel | undefined> => {
  return await dbPromise.get('settings', email)
}

export const setCompanyEmail = async (email: string, value: string): Promise<void> => {
  try {
    await dbPromise.put('settings', { key: email, value })
  } catch (error) {
    console.error('Failed to set company email:' + error)
    throw error
  }
}
