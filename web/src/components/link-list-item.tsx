import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button.tsx"
import { CopyIcon, TrashIcon } from "@phosphor-icons/react"
import { useDeleteLink } from "@/hooks/use-links.ts"
import type { Link } from "@/types/link.ts"

type LinkListItemProps = {
    link: Link
}

export function Spinner() {
    return (
        <svg className="size-8 animate-spin text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    )
}

export function LinkListItem({ link } : LinkListItemProps) {
    const [copied, setCopied] = useState(false)

    const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink()

    const shortUrlFull = `${import.meta.env.VITE_FRONTEND_URL}/${link.shortUrl}`

    async function handleDelete() {
        if (!window.confirm(`Você quer realmente apagar o link ${link.shortUrl}?`)) {
            return
        }
        await deleteLink(link.id)
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(shortUrlFull)
        setCopied(true)
        toast.info("Link copiado com sucesso", {
            description: `O link ${link.shortUrl} foi copiado para a área de transferência.`,
        })
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex flex-col gap-1 min-w-0">
                <a
                    href={shortUrlFull}
                    className="text-md font-semibold text-blue-base hover:underline truncate"
                    target="_blank"
                >
                    {shortUrlFull}
                </a>
                <span className="text-sm text-gray-500 truncate">
                    {link.originalUrl}
                </span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                {link.accessCount !== undefined && (
                    <span className="flex items-center gap-1 text-sm text-gray-500">
                        {link.accessCount} acessos
                    </span>
                )}

                <Button
                    variant="secondary"
                    className="size-8"
                    title={copied ? "Copiado!" : "Copiar link"}
                    onClick={handleCopy}
                >
                    <CopyIcon className="size-4 shrink-0" />
                </Button>

                <Button
                    variant="secondary"
                    className="h-8 w-8"
                    title="Excluir link"
                    disabled={isDeleting}
                    onClick={handleDelete}
                >
                    <TrashIcon className="size-4 shrink-0" />
                </Button>
            </div>
        </div>
    )
}
