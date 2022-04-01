import { ContextWrapper } from "./components/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";
import { NavBar } from "./components/NavBar";

function App() {
  const contextObject = {
    translations: translations,
    theme: "dark",
    token: "",
  };

  return (
    <ContextWrapper contextObject={contextObject}>
      <NavBar />
      <Pages />
    </ContextWrapper>
  );
}

export default App;
