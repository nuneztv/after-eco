import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import './globals.css';
import { AxiosProvider } from '../providers/AxiosProvider';

export const metadata: Metadata = {
  title: 'After Admin',
  description: 'Panel de administración de After',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="es">
      <body>
        <AxiosProvider>{children}</AxiosProvider>
      </body>
    </html>
  );
};

export default RootLayout;
