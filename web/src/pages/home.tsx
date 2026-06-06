import { NewLink } from "@/components/new-link.tsx"
import { LinkList } from "@/components/link-list.tsx"
import { LinkListItem } from "@/components/link-list-item.tsx"
import brevlyLogo from "@/assets/logo.svg"

export function HomePage() {

    const data = { links: [] }
    const isLoading = false
    const isExporting = false

    function handleSubmit(data: { originalUrl: string; shortUrl: string }) {

    }

    function handleExport() {

    }

  return (
    <>
        <div className="w-5xl">

            <div className="px-4 py-12 space-y-6">

                <header>
                    <img src={brevlyLogo} alt="Brev.ly Logo" className="w-24 h-12" />
                </header>

                <div className="w-full flex flex-col sm:flex-row gap-4">

                    <NewLink onSubmit={handleSubmit} />

                    <LinkList
                        data={data}
                        isLoading={isLoading}
                        isExporting={isExporting}
                        onExport={handleExport}
                        renderItem={(link) => <LinkListItem link={link} />}
                    />

                </div>
            </div>

        </div>
    </>
  )
}