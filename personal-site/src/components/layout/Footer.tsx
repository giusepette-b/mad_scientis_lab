export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Meu Site Didático. Todos os direitos reservados.</p>
          <p className="mt-2 text-sm">
            Desenvolvido com Next.js, React e TypeScript
          </p>
        </div>
      </div>
    </footer>
  )
}