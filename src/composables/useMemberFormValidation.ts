import { computed, type Ref } from 'vue'
import type { MemberModel } from '@/models/member.model'

export type MemberFieldErrors = {
  name: string[]
  phoneNo: string[]
  points: string[]
}

// Accept a partial model so creation/update forms can both use it
export function useMemberFormValidation(form: Ref<Partial<MemberModel> | undefined>) {
  const validate = (f: Partial<MemberModel> | undefined): MemberFieldErrors => {
    const errors: MemberFieldErrors = { name: [], phoneNo: [], points: [] }
    if (!f) return errors

    if (!f.name || f.name.trim().length < 2) {
      errors.name.push('Name must be at least 2 characters.')
    }

    if (!f.phoneNo || f.phoneNo.length < 10 || f.phoneNo.length > 15) {
      errors.phoneNo.push('Phone must be 10-15 chars.')
    }

    if (f.points !== undefined && f.points !== null) {
      const n = Number(f.points)
      if (Number.isNaN(n) || n < 0) {
        errors.points.push('Points must be a non-negative number.')
      }
    }

    return errors
  }

  const formErrors = computed(() => validate(form.value))
  const isValid = computed(() => Object.values(formErrors.value).every((arr) => arr.length === 0))

  return { formErrors, isValid, validate }
}
