import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"

type FormData = {
    originalUrl: string
    shortUrl: string
}

type NewLinkProps = {
    onSubmit: (data: FormData) => void
    isLoading?: boolean
}

export function NewLink({ onSubmit, isLoading }: NewLinkProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>()

    function onValid(data: FormData) {
        onSubmit(data)
        reset()
    }

    return (
        <section className="w-full sm:w-[380px] sm:flex-none space-y-6 rounded-lg p-6 shadow-sm bg-white">
            <h2 className="text-lg font-bold text-gray-600">
                Novo link
            </h2>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
                <Input
                    id="originalUrl"
                    label="URL original"
                    placeholder="https://exemplo.com"
                    error={errors.originalUrl?.message}
                    {...register("originalUrl", {
                        required: "URL original é obrigatória",
                        pattern: {
                            value: /^https?:\/\/.+\..+/,
                            message: "Informe uma URL válida (ex: https://exemplo.com)",
                        },
                    })}
                />
                <Input
                    id="shortUrl"
                    label="URL encurtada"
                    prefix="brev.ly/"
                    className="pl-1!"
                    error={errors.shortUrl?.message}
                    {...register("shortUrl", {
                        required: "URL encurtada é obrigatória",
                        pattern: {
                            value: /^[a-zA-Z0-9-_]+$/,
                            message: "Use apenas letras, números, - ou _",
                        },
                        minLength: {
                            value: 3,
                            message: "Mínimo de 3 caracteres",
                        },
                    })}
                />
                <Button
                    type="submit"
                    loading={isLoading}
                    className="w-full h-12"
                    variant="primary"
                >
                    Salvar Link
                </Button>
            </form>
        </section>
    )
}
