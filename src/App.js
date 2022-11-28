import logo from './logo.svg';
import './App.css';
import { useRoutes } from 'react-router-dom'
import routes from './routes/routes';

function App() {
  const routeElements = useRoutes(routes)
  return (
    <div className='App'>
      {routeElements}
    </div>
  );
}


export default App;
