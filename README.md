# Catálogo Tivatim

Catálogo eletrônico (revista digital) em React + Vite, com efeito de
folhear páginas, zoom, busca por categoria e ficha de cada produto.

- **Rodar localmente:** `npm install` e depois `npm run dev` (abre em
  `http://localhost:5173`).
- **Build de produção:** `npm run build` (gera a pasta `dist/`).
- **Deploy:** o projeto está conectado ao GitHub
  (`anaclaravalentim/catalogo`) e publicado pela Vercel.

## Como editar os produtos sem mexer em código

Existe um painel de edição em `/admin` (ex.:
`https://SEU-DOMINIO.vercel.app/admin`) onde é possível **criar, editar e
excluir produtos** do catálogo direto pelo navegador — sem precisar abrir
nenhum arquivo de código. Cada alteração salva no painel vira
automaticamente um novo commit no GitHub, e a Vercel publica a mudança em
poucos minutos.

### O que dá pra fazer no painel

- Editar nome, marca, categoria, modelo, descrição e especificações de um
  produto existente.
- Trocar a foto de um produto.
- Criar um produto novo ou excluir um existente.

### Uma limitação importante

O painel edita os **dados de cada produto**, mas não decide **em qual
página do catálogo** ele aparece — isso continua definido no arquivo
`src/data/pages.js` (fora do painel). Ou seja:

- Editar um produto **que já existe numa página** funciona 100% pelo painel.
- Criar um produto **novo do zero** cria o cadastro dele, mas ele só
  aparece de fato numa página da revista depois que alguém adicionar o ID
  dele em `src/data/pages.js` — essa parte ainda precisa de alguém que mexa
  em código.
- **Nunca altere o campo "ID" de um produto já existente** — é por esse ID
  que `pages.js` encontra o produto; mudar o ID faz o produto sumir da
  página onde estava (o cadastro continua existindo, só some da vitrine).

---

## Configuração inicial do painel (feita uma única vez)

Isso já foi implementado no código, mas precisa de 3 passos manuais pra
ficar funcionando — feitos uma única vez, por quem tem acesso à conta da
Vercel e do GitHub. Depois disso, o dia a dia de editar produtos não exige
mais nenhum desses passos.

### Passo 1 — Publicar o site na Vercel

Se o site ainda não está publicado na Vercel:

1. Acesse [vercel.com](https://vercel.com) e entre com sua conta (pode ser
   com login do GitHub).
2. Clique em **Add New → Project**.
3. Selecione o repositório `anaclaravalentim/catalogo` e clique em
   **Import**.
4. A Vercel detecta automaticamente que é um projeto Vite — não precisa
   mudar nenhuma configuração. Clique em **Deploy**.
5. Espere terminar (1-2 minutos) e anote o domínio gerado, algo como
   `https://catalogo-xxxx.vercel.app` (aparece no topo da página do
   projeto, em "Domains").

### Passo 2 — Criar um "OAuth App" no GitHub

Isso é o que permite ao painel `/admin` confirmar sua identidade do GitHub
antes de deixar você editar os produtos.

1. Acesse
   [github.com/settings/developers](https://github.com/settings/developers)
   → aba **OAuth Apps** → **New OAuth App**.
2. Preencha:
   - **Application name:** `Catálogo Tivatim` (ou qualquer nome)
   - **Homepage URL:** o domínio da Vercel do Passo 1 (ex.:
     `https://catalogo-xxxx.vercel.app`)
   - **Authorization callback URL:** o mesmo domínio + `/api/callback`
     (ex.: `https://catalogo-xxxx.vercel.app/api/callback`)
3. Clique em **Register application**.
4. Na página do app criado, copie o **Client ID** e clique em **Generate a
   new client secret** para gerar e copiar o **Client Secret**. Guarde os
   dois — o secret só aparece uma vez.

### Passo 3 — Configurar as variáveis de ambiente na Vercel

1. No painel da Vercel, abra o projeto → **Settings** → **Environment
   Variables**.
2. Adicione duas variáveis (marcando todos os ambientes: Production,
   Preview e Development):
   - `OAUTH_CLIENT_ID` → cole o Client ID do Passo 2
   - `OAUTH_CLIENT_SECRET` → cole o Client Secret do Passo 2
3. Clique em **Save**.
4. Vá em **Deployments**, abra o menu "⋯" do deployment mais recente e
   clique em **Redeploy** (as variáveis novas só valem a partir do próximo
   deploy).

### Passo 4 — Apontar o painel pro domínio certo

Abra `public/admin/config.yml` neste projeto e troque a linha:

```yaml
base_url: https://SEU-DOMINIO-AQUI.vercel.app
```

pelo domínio real da Vercel (o mesmo do Passo 1), depois envie a mudança:

```bash
git add public/admin/config.yml
git commit -m "Configura domínio do painel de edição"
git push
```

### Pronto — usando o painel

Acesse `https://SEU-DOMINIO.vercel.app/admin`, clique em **Login with
GitHub**, autorize o app (só na primeira vez) e o painel abre com a lista
de produtos. Qualquer edição salva já publica sozinha em alguns minutos.

Só quem tem acesso de escrita ao repositório `anaclaravalentim/catalogo`
no GitHub consegue logar no painel — então dar acesso a "outra pessoa" pra
editar os produtos é adicioná-la como colaboradora do repositório (GitHub
→ Settings → Collaborators).
