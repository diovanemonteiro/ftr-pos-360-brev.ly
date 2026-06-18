import { NewLink } from "@/components/new-link.tsx"
import { LinkList } from "@/components/link-list.tsx"
import { LinkListItem } from "@/components/link-list-item.tsx"
import brevlyLogo from "@/assets/logo.svg"
import {useLinks} from "@/hooks/use-links.ts";

export function HomePage() {

    const { data, isLoading } = useLinks()

    // const data = {
    //     total: 5,
    //     links: [
    //         { id: 1, originalUrl: "https://www.google.com.br", shortUrl: "google", accessCount: 142 },
    //         { id: 2, originalUrl: "https://www.github.com/diovane", shortUrl: "meu-github", accessCount: 87 },
    //         { id: 3, originalUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", shortUrl: "yt-video", accessCount: 310 },
    //         { id: 4, originalUrl: "https://tailwindcss.com/docs/installation", shortUrl: "tw-docs", accessCount: 23 },
    //         { id: 5, originalUrl: "https://react.dev/learn", shortUrl: "react-learn", accessCount: 56 },
    //     ],
    // }

    // const isLoading = false
    const isExporting = false

    function handleSubmit(data: { originalUrl: string; shortUrl: string }) {

    }

    function handleExport() {

    }

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12">

        <header className="mb-6">
            <img src={brevlyLogo} alt="Brev.ly Logo" className="w-24 h-12" />
        </header>

        <div className="flex flex-col sm:flex-row gap-4 items-start">

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
  )
}