import { Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Student from './pages/Student';
function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} exact />
      <Route path='/student' component={Student} exact />
    </div>
  );
}

export default App;
