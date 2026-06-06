import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx"
import { LinkList } from "@/components/link-list.tsx"
import { LinkListItem } from "@/components/link-list-item.tsx"
import brevlyLogo from "@/assets/logo.svg"
import { DownloadSimpleIcon, LinkBreakIcon, LinkSimpleBreakIcon } from "@phosphor-icons/react"

export function HomePage() {

    const data = { links: []}
    const isLoading = false
    const isExporting = false

    function handleSubmit(event)
    {

    }

    function handleExport(event)
    {

    }

  return (
    <>
        <div className="w-5xl">

            <div className="px-4 py-12 space-y-6">

                <header>
                    <img src={brevlyLogo} alt="Brev.ly Logo" className="w-24 h-12" />
                </header>

                <div className="w-full flex flex-col sm:flex-row gap-4">

                    <section className="w-auto sm:w-[380px] flex-none space-y-6 rounded-lg p-6 shadow-sm bg-white">
                        <h2 className="text-lg font-bold text-gray-600">
                            Novo link
                        </h2>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                id="originalUrl"
                                label="URL original"
                                placeholder="https://exemplo.com"
                            />
                            <Input
                                id="shortUrl"
                                label="URL encurtada"
                                prefix="brev.ly/"
                                className="pl-1!"
                            />
                            <Button
                                type="submit"
                                className="w-full h-12"
                                variant="primary"
                            >
                                Salvar Link
                            </Button>
                        </form>
                    </section>

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