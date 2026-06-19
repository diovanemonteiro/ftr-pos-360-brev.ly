import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import logoSvg from "@/assets/logo-icon.svg"

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

        <div className="w-full max-w-[580px] mx-auto px-3">

            <div className="w-full flex flex-col items-center justify-center gap-6 px-5 py-12 sm:px-12 sm:py-16 rounded-lg bg-white">
                <img src={logoSvg} alt="Brev.ly" className="size-12" />

                {/*<span className="size-8 animate-spin rounded-full border-3 border-blue-base border-t-transparent" />*/}
                <p className="text-xl font-bold text-gray-600">Redirecionando...</p>

                <div className="flex flex-col items-center gap-1">
                    <p className="text-md font-semibold text-gray-500 text-center">
                        O link será aberto automaticamente em alguns instantes.
                    </p>
                    <p className="text-md font-semibold text-gray-500 text-center">
                        Não foi redirecionado? Acesse aqui
                    </p>
                </div>
            </div>

        </div>
    )
}
