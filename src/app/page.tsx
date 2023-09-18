import BookList from '../components/BookList'

export default function Home() {
  return (
    <main>
      <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center">
        <h1 className="mt-10 text-3xl font-bold leading-tight text-gray-900">Book Store</h1>
        <div className="mb-4">
          <BookList />
        </div>
      </div>
    </main>
  )
}
