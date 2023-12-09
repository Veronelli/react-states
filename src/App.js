import './App.css';
import { UseState } from './UseState';
import { ClassState } from './ClassState';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseReducer name="Use Reducer"></UseReducer>
      <UseState name="Use State"/>
      <ClassState name="Class State"/>
    </div>
  );
}

export default App;
