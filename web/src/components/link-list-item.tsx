import { useState } from "react"
import { Button } from "@/components/ui/button.tsx"
import { CopyIcon, TrashIcon, ChartBarIcon } from "@phosphor-icons/react"

type LinkListItemProps = {
    link: {
        id: string | number
        originalUrl: string
        shortUrl: string
        accessCount?: number
    }
    onDelete?: (id: string | number) => void
}

export function LinkListItem({ link, onDelete }: LinkListItemProps) {
    const [copied, setCopied] = useState(false)

    const shortUrlFull = `brev.ly/${link.shortUrl}`

    async function handleCopy() {
        await navigator.clipboard.writeText(shortUrlFull)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex flex-col gap-0.5 min-w-0">
                <a
                    href={`/${link.shortUrl}`}
                    className="text-sm font-medium text-blue-600 hover:underline truncate"
                >
                    {shortUrlFull}
                </a>
                <span className="text-xs text-gray-400 truncate">{link.originalUrl}</span>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                {link.accessCount !== undefined && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                        <ChartBarIcon size={14} />
                        {link.accessCount} acessos
                    </span>
                )}

                <Button
                    variant="secondary"
                    className="h-8 w-8 p-0!"
                    title={copied ? "Copiado!" : "Copiar link"}
                    onClick={handleCopy}
                >
                    <CopyIcon size={14} />
                </Button>

                {onDelete && (
                    <Button
                        variant="danger"
                        className="h-8 w-8 p-0!"
                        title="Excluir link"
                        onClick={() => onDelete(link.id)}
                    >
                        <TrashIcon size={14} />
                    </Button>
                )}
            </div>
        </div>
    )
}
