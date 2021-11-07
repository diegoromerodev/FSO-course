import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *, *::after, *::before {
        font-family: "Segoe UI";
        margin: 0;
        padding: 0;
    }

    body {
        min-height: 100vh;
        background: #ddfadd;
    }
`;

export default GlobalStyles;
