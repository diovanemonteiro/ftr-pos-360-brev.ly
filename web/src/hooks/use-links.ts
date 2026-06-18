import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { CreateLinkFormData } from '@/schemas/link-schema'

export interface Link {
  id: string
  originalUrl: string
  shortUrl: string
  accessCount: number
  createdAt: string
}

interface GetLinksResponse {
  links: Link[]
  total: number
}

export function useLinks(page = 1, pageSize = 20) {
  return useQuery({
    queryKey: ['links', page, pageSize],
    queryFn: async () => {
      const { data } = await api.get<GetLinksResponse>('/links', {
        params: { page, pageSize },
      })
      return data
    },
  })
}

export function useCreateLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateLinkFormData) => {
      const response = await api.post<Link>('/links', data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })
}

export function useDeleteLink() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/links/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
  })
}

export function useGetOriginalUrl(shortUrl: string) {
  return useQuery({
    queryKey: ['original-url', shortUrl],
    queryFn: async () => {
      const { data } = await api.get<{ id: string; originalUrl: string }>(
        `/links/${shortUrl}`
      )
      return data
    },
    retry: false,
  })
}

export function useIncrementAccess() {
  return useMutation({
    mutationFn: async (id: string) => {
      await api.patch(`/links/${id}/access`)
    },
  })
}

export function useExportLinks() {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<{ url: string }>('/links/exports')
      return data
    },
  })
}
