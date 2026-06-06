import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export function Redirect() {
    const { shortUrl } = useParams<{ shortUrl: string }>()
    const navigate = useNavigate()
    // const { data, isLoading, isError } = useGetOriginalUrl(shortUrl ?? '')
    // const { mutate: incrementAccess } = useIncrementAccess()

    const data = { id: 1, originalUrl: "https://www.google.com.br" }
    const isLoading = false
    const isError = false
    const incrementAccess = (_id: number, options?: { onSettled?: () => void }) => {
        options?.onSettled?.()
    }

    useEffect(() => {
        if (isError) {
            navigate('/not-found', { replace: true })
            return
        }

        if (data) {
            incrementAccess(data.id, {
                onSettled: () => {
                    window.location.href = data.originalUrl
                },
            })
        }
    }, [data, isError, incrementAccess, navigate])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="text-center">
                <span className="mb-4 block size-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent mx-auto" />
                {isLoading ? (
                    <p className="text-gray-500">Redirecionando...</p>
                ) : null}
            </div>
        </div>
    )
}
