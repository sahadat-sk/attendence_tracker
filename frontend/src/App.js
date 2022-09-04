import { Route } from 'react-router-dom';
import './App.css';
import Protected from './components/Protected';
import Home from './pages/Home';
import Student from './pages/Student';
import Teacher from './pages/Teacher';
function App() {
  return (
    <div className="App">
      <Route path='/' component={Home} exact />
      <Protected>
        <Route path='/student' component={Student} exact />
        <Route path='/teacher' component={Teacher} exact />       
      </Protected>
    </div>
  );
}

export default App;
