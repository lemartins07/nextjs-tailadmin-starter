import Link from 'next/link';

const foundations = [
  'Next.js com App Router, TypeScript e Tailwind CSS',
  'PostgreSQL local com Docker e Prisma ORM',
  'Catálogo TailAdmin isolado da aplicação',
] as const;

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm sm:p-12">
        <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">
          Next.js Starter
        </span>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          A base do novo projeto está pronta.
        </h1>

        <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-600">
          Desenvolva o produto nesta área. Use as telas do TailAdmin como
          catálogo visual e copie apenas os componentes necessários.
        </p>

        <ul className="mt-8 space-y-3 text-sm text-zinc-700">
          {foundations.map((foundation) => (
            <li className="flex items-center gap-3" key={foundation}>
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-zinc-900"
              />
              {foundation}
            </li>
          ))}
        </ul>

        <Link
          className="mt-10 inline-flex rounded-xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          href="/template"
        >
          Abrir catálogo do template
        </Link>
      </section>
    </main>
  );
}
