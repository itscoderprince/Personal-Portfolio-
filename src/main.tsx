import { createRoot } from 'react-dom/client';
import '@/index.css';
import { App } from './App.tsx';
import Profile from './components/Profile.tsx';

createRoot(document.getElementById('root')!).render(
    <main className='min-h-screen lg:flex lg:items-start lg:gap-10 pb-20 lg:pb-0'>
      <Profile />
      <App />
    </main>
);

