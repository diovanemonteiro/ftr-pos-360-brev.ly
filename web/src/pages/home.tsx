import { NewLink } from "@/components/new-link.tsx"
import { LinkList } from "@/components/link-list.tsx"
import brevlyLogo from "@/assets/logo.svg"
import { useLinks, useExportLinks } from "@/hooks/use-links.ts";

export function HomePage() {

    const { data, isLoading } = useLinks()
    const { mutate: exportLinks, isPending: isExporting } = useExportLinks()

    function handleExport() {
        exportLinks(undefined, {
            onSuccess: ({ url }) => {
                const a = document.createElement('a')
                a.href = url
                a.download = ''
                a.click()
            },
        })
    }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">

        <header className="mb-6">
            <img src={brevlyLogo} alt="Brev.ly Logo" className="w-24 h-12" />
        </header>

        <div className="flex flex-col sm:flex-row gap-4 items-start">
            <NewLink />

            <LinkList
                data={data}
                isLoading={isLoading}
                isExporting={isExporting}
                onExport={handleExport}
            />
        </div>

    </div>
  )
}