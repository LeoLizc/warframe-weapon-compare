import './app.css';
import { About } from './components/About';
import { Background } from './components/background';
import { Comparator } from './components/comparator';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { useEffect, useState } from 'preact/hooks';

const getRoute = () => (window.location.hash === '#/about' ? 'about' : 'home');

export const App = () => {
  const [route, setRoute] = useState(getRoute);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRoute());
    };

    window.addEventListener('hashchange', onHashChange);

    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const isAbout = route === 'about';

  return (
    <>
      <MantineProvider forceColorScheme="dark">
        <main>
          <header className="mx-auto mb-4 flex w-full max-w-6xl items-center justify-between px-4 pt-2 text-sm text-slate-200/90">
            <a
              className="font-bold tracking-wide text-sky-200"
              href="#/"
            >
              WCompare
            </a>
            <nav className="flex items-center gap-2">
              <a
                className={`rounded-full px-3 py-1 transition ${
                  !isAbout
                    ? 'bg-sky-500/20 text-sky-200'
                    : 'text-slate-200 hover:text-sky-200'
                }`}
                href="#/"
              >
                Home
              </a>
              <a
                className={`rounded-full px-3 py-1 transition ${
                  isAbout
                    ? 'bg-sky-500/20 text-sky-200'
                    : 'text-slate-200 hover:text-sky-200'
                }`}
                href="#/about"
              >
                About
              </a>
            </nav>
          </header>

          {isAbout ? <About /> : <Comparator />}

          <footer className="px-4 pb-4 pt-6 text-center text-sm text-slate-200/90">
            Data source:{' '}
            <a
              className="font-semibold text-sky-300 underline underline-offset-2 transition hover:text-sky-200"
              href="https://api.warframestat.us/"
              rel="noopener noreferrer"
              target="_blank"
            >
              WarframeStat.us API
            </a>
            .
          </footer>
        </main>
      </MantineProvider>
      <Background />
    </>
  );
};
