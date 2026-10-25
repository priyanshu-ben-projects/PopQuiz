import "./index.css";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MantineProvider theme={theme}>
      <App />
    </MantineProvider>
  </BrowserRouter>,
);
