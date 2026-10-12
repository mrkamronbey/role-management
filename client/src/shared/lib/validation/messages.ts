import { NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from './patterns'

export const VALIDATION_MESSAGES = {
  required: (field: string) => `${field} kiritilishi shart`,
  nameLength: `Uzunligi ${NAME_MIN_LENGTH} dan ${NAME_MAX_LENGTH} tagacha belgi bo'lishi kerak`,
  nameLetters: "Faqat harflardan iborat bo'lishi kerak",
  email: "Email noto'g'ri formatda (masalan: example@gmail.com)",
  passwordLength: `Kamida ${PASSWORD_MIN_LENGTH} ta belgi`,
  passwordUppercase: 'Kamida 1 ta katta harf (A–Z)',
  passwordSpecialChar: 'Kamida 1 ta maxsus belgi (!, #, @ ...)',
  passwordWeak: 'Parol talablarga javob bermaydi',
}
