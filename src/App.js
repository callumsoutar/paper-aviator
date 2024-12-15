import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Scheduler from './pages/Scheduler/Scheduler';
import Staff from './pages/Staff/Staff';
import Aircraft from './pages/Aircraft/Aircraft';
import Members from './pages/Members/Members';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Scheduler />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/aircraft" element={<Aircraft />} />
            <Route path="/members" element={<Members />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
