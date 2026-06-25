import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { isAxiosError } from "axios"
import { toast } from "sonner"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useCreateLink } from "@/hooks/use-links.ts"
import { createLinkSchema, type CreateLinkFormData } from "@/schemas/link-schema.ts";

export function NewLink() {

    const { mutate: createLink, isPending: isCreating } = useCreateLink()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreateLinkFormData>({
        resolver: zodResolver(createLinkSchema),
    })

    function onSubmit(data: CreateLinkFormData) {
        createLink(data, {
            onSuccess: () => reset(),
            onError: (error) => {
                if (isAxiosError(error) && error.response?.data?.message === "Short URL already exists") {
                    toast.error("Essa URL encurtada já existe.", {
                        description: "Escolha outra URL encurtada e tente novamente.",
                    })
                    return
                }

                toast.error("Não foi possível criar o link. Tente novamente.")
            },
        })
    }

    return (
        <section className="w-full sm:w-[380px] sm:flex-none space-y-6 rounded-lg p-8 shadow-sm bg-white">
            <h2 className="text-lg font-bold text-gray-600">
                Novo link
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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
                    loading={isCreating}
                    className="w-full h-12"
                    variant="primary"
                >
                    Salvar Link
                </Button>
            </form>
        </section>
    )
}
