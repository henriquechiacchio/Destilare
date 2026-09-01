import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

/**
 * Nome do item: ponto de entrada da aplicação
 *
 * Papel no projeto: Inicializa o React e monta a aplicação Destilare no
 * elemento HTML destinado à interface.
 *
 * Funcionamento: Localiza o elemento #root, cria a raiz React e renderiza o
 * componente App dentro de StrictMode para auxiliar na identificação de
 * problemas durante o desenvolvimento.
 *
 * Dependências e integrações: Usa createRoot do react-dom/client, StrictMode e
 * os estilos globais de index.css.
 *
 * Observações: O elemento #root é definido no index.html e deve existir para
 * que a montagem da aplicação seja realizada.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
