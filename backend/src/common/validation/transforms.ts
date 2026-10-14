type TransformParams = { value: unknown }

export const trim = ({ value }: TransformParams) =>
  typeof value === 'string' ? value.trim() : value

export const toLowerCase = ({ value }: TransformParams) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value
