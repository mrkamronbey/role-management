export const formatMoney = (amount: number) => `${amount.toLocaleString('ru-RU')} so'm`

export const formatCompactMoney = (amount: number) =>
  amount >= 1_000_000
    ? `${(amount / 1_000_000).toLocaleString('ru-RU', { maximumFractionDigits: 1 })} mln so'm`
    : formatMoney(amount)
