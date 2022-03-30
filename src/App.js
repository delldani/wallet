import { ContextWrapper} from './components/ContextWrapper';
import { Pages} from './pages/Pages'

function App() {
  return (
    <ContextWrapper theme='dark'>
    <Pages/>
    </ContextWrapper>
  );
}

export default App;
