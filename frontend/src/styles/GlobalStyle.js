import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=DM+Sans:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { font-size: 16px; scroll-behavior: smooth; }

  body {
    font-family: ${p => p.theme.fonts.body};
    background: ${p => p.theme.colors.earth[50]};
    color: ${p => p.theme.colors.earth[800]};
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
  }

  a { text-decoration: none; color: inherit; }
  button { font-family: inherit; cursor: pointer; border: none; background: none; }
  input, select, textarea { font-family: inherit; }
  input::placeholder, textarea::placeholder { color: ${p => p.theme.colors.earth[600]}; opacity: 1; }
  img { max-width: 100%; display: block; }

  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: ${p => p.theme.colors.earth[100]}; }
  ::-webkit-scrollbar-thumb { background: ${p => p.theme.colors.earth[300]}; border-radius: 3px; }

  ::selection { background: ${p => p.theme.colors.gold[300]}; color: ${p => p.theme.colors.earth[800]}; }
`
