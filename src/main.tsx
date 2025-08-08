// main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
// import { StyledEngineProvider } from "@mui/material/styles";
// import GlobalStyles from "@mui/material/GlobalStyles";
// import { theme } from "./lib/theme.ts"

const muiCache = createCache({
  key: "mui",
  prepend: true, // Esto es lo que resuelve el conflicto de especificidad
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <StyledEngineProvider enableCssLayer> */}
      {/* <GlobalStyles styles="@layer theme, base, mui, components, utilities;" /> */}
      {/* <ThemeProvider theme={theme}> */}
        <CacheProvider value={muiCache}>
          <App />
        </CacheProvider>
      {/* </ThemeProvider> */}
    {/* </StyledEngineProvider> */}
  </StrictMode>
);
