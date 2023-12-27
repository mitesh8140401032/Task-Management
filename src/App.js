import './App.css';
import ContextProvider from './ContextProvider';
import RouterContainer from './RouterContainer';

function App() {
  return (
    <>
      <ContextProvider>
        <RouterContainer />
      </ContextProvider>
    </>
  );
}

export default App;
