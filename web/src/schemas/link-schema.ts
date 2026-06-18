import { z } from 'zod'

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, 'URL original é obrigatória')
    .url('Informe uma URL válida'),
  shortUrl: z
    .string()
    .min(1, 'URL encurtada é obrigatória')
    .min(3, "Mínimo de 3 caracteres")
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'Apenas letras, números e hífens são permitidos'
    ),
})

export type CreateLinkFormData = z.infer<typeof createLinkSchema>
