import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Tasks from './pages/Tasks';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/tasks' Component={Tasks}/>
      </Routes>

    </>
  );
}

export default App;
