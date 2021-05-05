import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Se você quiser que seu aplicativo funcione offline e carregue mais rápido,
// você pode alterar unregister() para register() logo abaixo.
// Observe que isso vem com algumas armadilhas.
// Saiba mais sobre service workers em: https://developer.mozilla.org/pt-BR/docs/Web/API/Service_Worker_API/Using_Service_Workers

serviceWorker.unregister();
