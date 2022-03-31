import { ContextWrapper } from "./components/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";

function App() {
  const contextObject = {
    translations: translations,
    theme: "dark",
  };

  return (
    <ContextWrapper contextObject={contextObject}>
      <Pages />
    </ContextWrapper>
  );
}

export default App;
