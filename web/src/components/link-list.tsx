import { Button } from "@/components/ui/button.tsx"
import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react"
import type { Link } from "@/types/link.ts"
import { LinkListItem, Spinner } from "@/components/link-list-item.tsx"
import { SpinnerBar } from "@/components/ui/spinner-bar.tsx";

type LinkListProps = {
    data?: { links?: Link[]; total?: number }
    isLoading?: boolean
    isExporting?: boolean
    onExport?: () => void
}

export function LinkList({ data, isLoading, isExporting, onExport }: LinkListProps) {
    return (
        <section className="w-full sm:flex-1 rounded-lg shadow-sm bg-white">
            {isLoading ? <SpinnerBar /> : null}

            <div className=" space-y-5 p-8">
                <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold text-gray-800 truncate">
                        Meus links
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

                <div className="max-h-[27vh] sm:max-h-[calc(100vh-18rem)] overflow-y-auto">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-8 space-y-2">
                            <Spinner />
                            <p className="text-xs uppercase text-gray-500">Carregando links...</p>
                        </div>
                    ) : data?.links?.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-10 text-gray-300">
                            <LinkIcon size={32} className="text-gray-400"/>
                            <p className="text-xs uppercase text-gray-500">
                                Ainda nao existem links cadastrados.
                            </p>
                        </div>
                    ) : (
                        <ul className="flex flex-col border-t border-gray-200 divide-y divide-gray-200">
                            {data?.links?.map((link) => (
                                <li key={link.id}>
                                    <LinkListItem link={link} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    )
}
