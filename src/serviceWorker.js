// Este código opcional é usado para registrar um service worker. O register () não é chamado por padrão.
// Isso permite que o aplicativo carregue mais rápido em visitas subsequentes na produção
// e oferece recursos off-line. No entanto, também significa que os desenvolvedores (e usuários)
// só verão as atualizações implantadas em visitas subsequentes a uma página,
// depois que todas as guias existentes abertas na página forem fechadas,
// uma vez que os recursos armazenados em cache anteriormente são atualizados em segundo plano.
// Para saber mais sobre os benefícios deste modelo e instruções sobre como aceitá-lo,
// leia https://developer.mozilla.org/pt-BR/docs/Web/API/Service_Worker_API/Using_Service_Workers

const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] é o endereço IPv6 do localhost.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 considerado o localhost para o IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    // O construtor de URL está disponível em todos os navegadores que suportam SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // O service worker não funcionará se o PUBLIC_URL estiver em
      // uma origem diferente daquela em que nossa página é veiculada.
      // Isso pode acontecer se um CDN for usado para servir assets
      // Veja mais em: https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Executado no localhost. Vamos verificar se um service worker ainda existe ou não.
        checkValidServiceWorker(swUrl, config);

        // Adiciona um log a mais ao localhost,
        // apontando os desenvolvedores para a documentação do service worker / PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Este aplicativo da web está sendo servido em "cahe-first" por um service worker.' 
          );
        });
      } else {
        // Não é localhost. Basta registrar o prestador de serviço
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
           // Neste ponto, o conteúdo pré-armazenado em cache atualizado foi buscado, 
           // mas o service worker anterior ainda servirá o conteúdo mais antigo
           // até que todas as guias do cliente sejam fechadas.
              console.log(
                'Novo conteúdo está disponível e será usado quando todas as guias desta página forem fechadas.'
              );

              // Execute o callback
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // Neste ponto, tudo foi pré-armazenado. 
              // É o momento perfeito para exibir a mensagem
              // "O conteúdo está armazenado em cache para uso off-line".
              console.log('O conteúdo está armazenado em cache para uso off-line');

              // Execute callback
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Error during service worker registration:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Verifica se o service worker pode ser encontrado.
  // Se não for possível, recarrega a página.
  fetch(swUrl, {
    headers: { 'Service-Worker': 'script' },
  })
    .then(response => {
      // Certifica que o service worker existe e de que realmente estamos obtendo um arquivo JS.
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        // Nenhum service worker encontrado.
        // Provavelmente um aplicativo diferente de um SW. Recarrega a página.
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker encontrado. Proceda normalmente.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'Nenhuma conexão com a Internet encontrada. O aplicativo está sendo executado no modo offline.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then(registration => {
        registration.unregister();
      })
      .catch(error => {
        console.error(error.message);
      });
  }
}
