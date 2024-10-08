import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import SignupCard from "./components/LoginSignup/SignupCard";
import LoginCard from "./components/LoginSignup/LoginCard";
import ContactUsCard from "./components/contacts/ContactUsCard";
// import Header1 from "./components/header/Header1";
// import Header2 from "./components/header/Header2";
// import Header3 from "./components/header/Header3";


function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider 
// @ts-ignore
    value={colorMode}>
      <ThemeProvider 
// @ts-ignore
      theme={theme}>
        <CssBaseline />
        {/* <Header1 />
        <Header2 />
        <Header3 /> */}
        <LoginCard />
        <SignupCard />
        <ContactUsCard />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;


