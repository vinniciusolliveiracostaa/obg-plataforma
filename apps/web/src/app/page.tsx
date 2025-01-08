import Link from "next/link";



const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Pagina em Construção</h1>
      <Link href="/login" className="mt-4 text-xl hover:underline">Ir para Login</Link>
    </div>
  );
};

export default Home;