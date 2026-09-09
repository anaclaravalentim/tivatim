/**
 * Primeira etapa do login do painel /admin (Decap CMS): redireciona pro
 * GitHub pra pedir autorização, com um "state" aleatório (guardado num
 * cookie de curta duração) que o callback confere depois — só uma proteção
 * básica contra CSRF, sem precisar de banco/sessão.
 */
export default function handler(req, res) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    res.status(500).send('OAUTH_CLIENT_ID não configurado nas variáveis de ambiente da Vercel.');
    return;
  }

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host;
  const redirectUri = `${protocol}://${host}/api/callback`;

  const state = Math.random().toString(36).slice(2) + Date.now().toString(36);
  res.setHeader(
    'Set-Cookie',
    `cms_oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`
  );

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: 'repo,user',
    state,
  });

  res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params}` });
  res.end();
}
