import { Input } from "@/components/ui/input.tsx";
import { Button } from "@/components/ui/button.tsx"
import brevlyLogo from "@/assets/logo.svg"
import { DownloadSimpleIcon } from "@phosphor-icons/react"

export function HomePage() {

    const data = []
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

                    <section className="w-auto sm:w-[380px] flex-none mb-8 rounded-lg p-6 shadow-sm bg-white">
                        <h2 className="mb-4 text-lg font-semibold text-gray-800">
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
                                placeholder="meu-link"
                            />
                            <Button type="submit" className="w-full" variant="primary" disabled>
                                Encurtar URL
                            </Button>
                        </form>
                    </section>

                    <section className="w-auto sm:flex-1 rounded-lg p-6 shadow-sm bg-white">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-gray-800">
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
                                onClick={handleExport}
                                className="text-xs"
                            >
                                <DownloadSimpleIcon size={14} /> Exportar CSV
                            </Button>
                        </div>

                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <span className="size-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                            </div>
                        ) : data?.links?.length === 0 ? (
                            <p className="py-8 text-center text-sm text-gray-400">
                                Nenhum link cadastrado ainda.
                            </p>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {data?.links?.map((link) => (
                                    <li key={link.id}>
                                        <LinkListItem link={link} />
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                </div>
            </div>

        </div>
    </>
  )
}