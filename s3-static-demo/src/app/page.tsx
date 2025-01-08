export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome to ThaoVu channel
      </h1>
      <p className="text-xl text-gray-700">S3 Demo</p>
      <footer className="mt-8 text-gray-500">
        <a
          href="https://thaovu.org"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          https://thaovu.org
        </a>
      </footer>
    </div>
  );
}
