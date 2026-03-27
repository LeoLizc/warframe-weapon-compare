import './app.css';
import { Background } from './components/background';
import { Comparator } from './components/comparator';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export const App = () => {
  return (
    <>
      <MantineProvider forceColorScheme="dark">
        <main>
          <Comparator />
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
