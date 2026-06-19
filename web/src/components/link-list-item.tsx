import { useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { CopyIcon, TrashIcon, ChartBarIcon } from "@phosphor-icons/react"
import { useDeleteLink } from "@/hooks/use-links.ts"
import type { Link } from "@/types/link.ts"

type LinkListItemProps = {
    link: Link
}

export function LinkListItem({ link } : LinkListItemProps) {
    const [copied, setCopied] = useState(false)

    const { mutate: deleteLink, isPending: isDeleting } = useDeleteLink()

    const shortUrlFull = `brev.ly/${link.shortUrl}`

    async function handleDelete(id: string) {
        if (!window.confirm("Tem certeza que deseja excluir esse link?")) {
            return
        }
        await deleteLink(id)
    }

    async function handleCopy() {
        await navigator.clipboard.writeText(shortUrlFull)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between gap-4 py-4">
            <div className="flex flex-col gap-1 min-w-0">
                <a
                    href={`/${link.shortUrl}`}
                    className="text-md font-semibold text-blue-base hover:underline truncate"
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
                    className="h-8 w-8 p-0!"
                    title={copied ? "Copiado!" : "Copiar link"}
                    onClick={handleCopy}
                >
                    <CopyIcon size={16} />
                </Button>

                <Button
                    variant="secondary"
                    className="h-8 w-8 p-0!"
                    title="Excluir link"
                    disabled={isDeleting}
                    onClick={() => handleDelete(link.id)}
                >
                    <TrashIcon size={16} />
                </Button>
            </div>
        </div>
    )
}
