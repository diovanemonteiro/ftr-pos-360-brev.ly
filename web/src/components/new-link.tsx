import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"

const schema = z.object({
    originalUrl: z
        .string()
        .min(1, "URL original é obrigatória")
        .url("Informe uma URL válida (ex: https://exemplo.com)"),
    shortUrl: z
        .string()
        .min(1, "URL encurtada é obrigatória")
        .min(3, "Mínimo de 3 caracteres")
        .regex(/^[a-zA-Z0-9-_]+$/, "Use apenas letras, números, - ou _"),
})

type FormData = z.infer<typeof schema>

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
    } = useForm<FormData>({ resolver: zodResolver(schema) })

    function onValid(data: FormData) {
        onSubmit(data)
        reset()
    }

    return (
        <section className="w-full sm:w-[380px] sm:flex-none space-y-6 rounded-lg p-8 shadow-sm bg-white">
            <h2 className="text-lg font-bold text-gray-600">
                Novo link
            </h2>
            <form onSubmit={handleSubmit(onValid)} className="flex flex-col gap-4">
                <Input
                    id="originalUrl"
                    label="URL original"
                    placeholder="https://exemplo.com"
                    error={errors.originalUrl?.message}
                    {...register("originalUrl")}
                />
                <Input
                    id="shortUrl"
                    label="URL encurtada"
                    prefix="brev.ly/"
                    className="pl-1!"
                    error={errors.shortUrl?.message}
                    {...register("shortUrl")}
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
