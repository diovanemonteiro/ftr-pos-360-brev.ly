import { z } from 'zod'

export const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .min(1, 'URL original é obrigatória')
    .url('Informe uma URL válida'),
  shortUrl: z
    .string()
    .min(1, 'URL encurtada é obrigatória')
    .regex(
      /^[a-zA-Z0-9-]+$/,
      'Apenas letras, números e hifens são permitidos'
    ),
})

export type CreateLinkFormData = z.infer<typeof createLinkSchema>
