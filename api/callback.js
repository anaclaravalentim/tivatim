/**
 * Segunda etapa do login do painel /admin: o GitHub redireciona pra cá com
 * um "code"; trocamos esse code por um token de acesso e devolvemos pra
 * janela do CMS que abriu esse popup (via postMessage), no formato que o
 * Decap CMS espera do backend "github" com OAuth externo.
 */
function parseCookies(header) {
  const cookies = {};
  (header || '').split(';').forEach((part) => {
    const idx = part.indexOf('=');
    if (idx === -1) return;
    const key = part.slice(0, idx).trim();
    const value = part.slice(idx + 1).trim();
    if (key) cookies[key] = decodeURIComponent(value);
  });
  return cookies;
}

function htmlResponse(res, body) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(body);
}

export default async function handler(req, res) {
  const { code, state } = req.query;
  const cookies = parseCookies(req.headers.cookie);

  // Limpa o cookie de state de qualquer forma — ele só serve pra essa
  // tentativa de login.
  res.setHeader('Set-Cookie', 'cms_oauth_state=; Path=/; Max-Age=0');

  if (!code || !state || state !== cookies.cms_oauth_state) {
    res.status(400).send('Falha na verificação do login (state inválido ou expirado). Tente novamente.');
    return;
  }

  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    res.status(500).send('OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET não configurados nas variáveis de ambiente da Vercel.');
    return;
  }

  try {
    const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
    });
    const data = await tokenRes.json();

    if (data.error || !data.access_token) {
      htmlResponse(
        res,
        `<p>Erro ao obter o token: ${data.error_description || data.error || 'resposta inesperada do GitHub'}.</p>`
      );
      return;
    }

    const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
    htmlResponse(
      res,
      `<!doctype html><html><body>
        <script>
          (function () {
            function receiveMessage(e) {
              window.opener.postMessage(
                'authorization:github:success:${payload}',
                e.origin
              );
              window.removeEventListener('message', receiveMessage, false);
            }
            window.addEventListener('message', receiveMessage, false);
            window.opener.postMessage('authorizing:github', '*');
          })();
        </script>
      </body></html>`
    );
  } catch (err) {
    htmlResponse(res, `<p>Erro inesperado ao autenticar: ${err.message}</p>`);
  }
}
