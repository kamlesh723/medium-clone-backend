import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {/* We will add more routes here in subsequent steps */}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
