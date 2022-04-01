import { ContextWrapper } from "./components/ContextWrapper";
import { Pages } from "./pages/Pages";
import { translations } from "./utils/default";
import { NavBar } from "./components/NavBar";
import Box from "@mui/material/Box";

function App() {
  const contextObject = {
    translations: translations,
    theme: "dark",
    token: "",
  };

  return (
    <ContextWrapper contextObject={contextObject}>
      <Box sx={{ height: "100vh" }}>
        <NavBar />
        <Pages />
      </Box>
    </ContextWrapper>
  );
}

export default App;

// axios
// .post(
//   "https://wallet-cloudflare.gordongecco.workers.dev/user/search",
//   {
//     name: "dani2",
//     // password: "dani2",
//   },
//   {
//     headers: {
//       Authorization:
//         "Bearer " +
//         "NzEwOTYwMjQ3MTc5MTA5_MTY4MDQ1NDgyNTA4OTAyMTc_1857815512510722617816717181253223200173197721671581620078146639175421261382435245",
//     },
//   }
// )
// .then(function (response) {
//   const r = 5;
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
