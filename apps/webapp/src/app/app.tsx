import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import AppTheme from '../theme/AppTheme';
import { LanguageProvider } from '../components/Context';

export function App() {

  return (
    <AppTheme>
      <LanguageProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      </LanguageProvider>
    </AppTheme>
  );
}

export default App;
