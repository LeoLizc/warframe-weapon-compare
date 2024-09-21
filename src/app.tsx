import './app.css';
import { Background } from './components/background';
import { Comparator } from './components/comparator';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

export const App = () => {
  return (
    <>
      <MantineProvider forceColorScheme="dark">
        <Comparator />
      </MantineProvider>
      <Background />
    </>
  );
};
