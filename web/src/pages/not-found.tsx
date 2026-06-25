import logoSvg from "@/assets/404.svg";

export function NotFound() {
    return (
        <div className="w-full max-w-[580px] mx-auto px-3">
            <div className="w-full flex flex-col items-center justify-center gap-6 px-5 py-12 sm:px-12 sm:py-16 rounded-lg bg-white">
                <img src={logoSvg} alt="Brev.ly" className="w-48 h-21" />
                <p className="text-xl font-bold text-gray-600">
                    Link não encontrado
                </p>
                <p className="text-md font-semibold text-gray-500 text-center">
                    O link que você está tentando acessar não existe, foi removido ou é uma URL inválida.
                    Saiba mais em <a className="text-md font-semibold text-blue-base hover:underline truncate" href={import.meta.env.VITE_FRONTEND_URL}>brev.ly</a>.
                </p>
            </div>
        </div>
    )
}
