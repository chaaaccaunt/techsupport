import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './router';
import { Sidebar } from './components/feature/Sidebar';
import { Header } from './components/feature/Header';

function App() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <BrowserRouter basename={__BASE_PATH__}>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed inset-y-0 left-0 z-30 lg:static lg:z-auto
            transform transition-transform duration-300
            ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <Sidebar onClose={() => setIsMobileSidebarOpen(false)} />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <Header onMenuClick={() => setIsMobileSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto">
            <AppRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
