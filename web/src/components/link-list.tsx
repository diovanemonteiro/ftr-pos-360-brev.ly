import { Button } from "@/components/ui/button.tsx"
import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react"
import type { Link } from "@/types/link.ts"

type LinkListProps = {
    data?: { links?: Link[]; total?: number }
    isLoading?: boolean
    isExporting?: boolean
    onExport?: () => void
    renderItem: (link: Link) => React.ReactNode
}

export function LinkList({ data, isLoading, isExporting, onExport, renderItem }: LinkListProps) {
    return (
        <section className="w-auto sm:flex-1 rounded-lg shadow-sm bg-white divide-y divide-gray-200">

            <div className="mb-4 flex items-center justify-between p-4">
                <h2 className="text-lg font-bold text-gray-800">
                    Meus links
                    {data?.total !== undefined ? (
                        <span className="ml-2 text-sm font-normal text-gray-400">
                            ({data.total})
                        </span>
                    ) : null}
                </h2>
                <Button
                    variant="secondary"
                    loading={isExporting}
                    onClick={onExport}
                    className="h-8"
                >
                    <DownloadSimpleIcon size={14} /> Baixar CSV
                </Button>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                </div>
            ) : data?.links?.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-10 text-gray-300">
                    <LinkIcon size={32} className="text-gray-400" />
                    <p className="text-xs uppercase text-gray-500">
                        Ainda nao existem links cadastrados.
                    </p>
                </div>
            ) : (
                <ul className="flex flex-col gap-3">
                    {data?.links?.map((link) => (
                        <li key={link.id}>
                            {renderItem(link)}
                        </li>
                    ))}
                </ul>
            )}

        </section>
    )
}
