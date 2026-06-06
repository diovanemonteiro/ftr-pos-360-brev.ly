import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <h1 className="text-6xl font-bold text-blue-600">404</h1>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800">
                Link não encontrado
            </h2>
            <p className="mt-2 text-gray-500">
                O link encurtado que você acessou não existe ou foi removido.
            </p>
            <Link
                to="/"
                className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
                Voltar para a Home
            </Link>
        </div>
    )
}
