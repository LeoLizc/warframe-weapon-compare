export const About = () => {
  return (
    <section className="mx-auto mt-6 w-full max-w-4xl rounded-xl border border-zinc-300/20 bg-zinc-950/65 p-6 text-slate-100 backdrop-blur-sm md:p-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-sky-200 md:text-4xl">
        About
      </h1>
      <p className="mt-4 text-base leading-relaxed text-slate-200/95">
        Warframe Weapon Compare is a web app to visually compare Warframe weapon
        stats quickly. You can select multiple weapons, review their key values,
        and share the comparison through the URL. It is designed for players who
        want to make faster build decisions without jumping between multiple
        wikis or spreadsheets.
      </p>
      <p className="mt-3 text-base leading-relaxed text-slate-300/95">
        The goal is to make side-by-side analysis clear and practical, whether
        you are testing new loadouts, optimizing for critical chance or status,
        or simply exploring how weapons perform relative to each other.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-zinc-300/10 bg-zinc-950/80 p-4">
          <h2 className="text-lg font-semibold text-sky-300">
            What it includes
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200/90">
            <li>Comparison of multiple weapons.</li>
            <li>Charts for key stats.</li>
            <li>Detailed table for quick analysis.</li>
            <li>Selection persistence in the URL.</li>
          </ul>
        </article>

        <article className="rounded-xl border border-zinc-300/10 bg-zinc-950/80 p-4">
          <h2 className="text-lg font-semibold text-sky-300">Technologies</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-200/90">
            <li>Preact + TypeScript + Vite</li>
            <li>Mantine</li>
            <li>Recharts / Mantine Charts</li>
            <li>Tailwind CSS</li>
          </ul>
        </article>
      </div>

      <p className="mt-6 text-sm text-slate-300/95">
        Repository:{' '}
        <a
          className="font-semibold text-sky-300 underline underline-offset-2 transition hover:text-sky-200"
          href="https://github.com/LeoLizc/warframe-weapon-compare"
          rel="noopener noreferrer"
          target="_blank"
        >
          github.com/LeoLizc/warframe-weapon-compare
        </a>
      </p>
    </section>
  );
};
