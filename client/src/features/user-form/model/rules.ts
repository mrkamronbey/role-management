import type { FormRule } from 'antd'
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_REGEX,
  PASSWORD_MIN_LENGTH,
  SPECIAL_CHAR_REGEX,
  UPPERCASE_REGEX,
  VALIDATION_MESSAGES,
} from '@/shared/lib/validation'

export const PASSWORD_CHECKS = [
  {
    key: 'length',
    label: VALIDATION_MESSAGES.passwordLength,
    test: (value: string) => value.length >= PASSWORD_MIN_LENGTH,
  },
  {
    key: 'uppercase',
    label: VALIDATION_MESSAGES.passwordUppercase,
    test: (value: string) => UPPERCASE_REGEX.test(value),
  },
  {
    key: 'special',
    label: VALIDATION_MESSAGES.passwordSpecialChar,
    test: (value: string) => SPECIAL_CHAR_REGEX.test(value),
  },
]

export const getNameRules = (label: string): FormRule[] => [
  { required: true, whitespace: true, message: VALIDATION_MESSAGES.required(label) },
  { min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH, message: VALIDATION_MESSAGES.nameLength },
  { pattern: NAME_REGEX, message: VALIDATION_MESSAGES.nameLetters },
]

export const emailRules: FormRule[] = [
  { required: true, message: VALIDATION_MESSAGES.required('Email') },
  { type: 'email', message: VALIDATION_MESSAGES.email },
]

export const getPasswordRules = (required: boolean): FormRule[] => [
  { required, message: VALIDATION_MESSAGES.required('Parol') },
  {
    validator: (_, value?: string) => {
      if (!value || PASSWORD_CHECKS.every((check) => check.test(value))) {
        return Promise.resolve()
      }
      return Promise.reject(new Error(VALIDATION_MESSAGES.passwordWeak))
    },
  },
]
