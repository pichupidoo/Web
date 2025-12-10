import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ValeraList from './components/ValeraList';
import ValeraStats from './components/ValeraStats';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<ValeraList />} />
          <Route path="/valera/:id" element={<ValeraStats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;