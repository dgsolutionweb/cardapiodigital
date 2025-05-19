# Cardápio Digital

Um aplicativo de cardápio digital completo com painel administrativo desenvolvido com Next.js, Supabase e TypeScript.

## Funcionalidades

### Painel de Administração
- Autenticação via Supabase Auth
- Gerenciamento completo de categorias (CRUD)
- Gerenciamento completo de produtos (CRUD)
- Visualização e gerenciamento de pedidos
- Configuração de WhatsApp para checkout

### Cardápio Público
- Exibição responsiva de categorias e produtos
- Filtragem por categorias
- Carrinho de compras
- Checkout via WhatsApp

## Tecnologias Utilizadas

- **Frontend**: Next.js 14 com App Router
- **Backend**: Supabase (Autenticação, Banco de Dados, Storage)
- **Estilização**: TailwindCSS
- **Gerenciamento de Estado**: Zustand
- **Validação**: Zod
- **Notificações**: React Hot Toast

## Estrutura do Projeto

```
cardapio-digital/
├── public/               # Arquivos estáticos
├── src/
│   ├── app/              # App Router do Next.js
│   │   ├── admin/        # Rotas do painel administrativo
│   │   │   ├── categorias/  # CRUD de categorias
│   │   │   ├── produtos/    # CRUD de produtos
│   │   │   ├── pedidos/     # Gerenciamento de pedidos
│   │   │   └── configuracoes/ # Configurações
│   │   └── ...           # Páginas públicas do cardápio
│   ├── components/       # Componentes React
│   │   ├── cart/         # Componentes do carrinho
│   │   ├── category/     # Componentes de categoria
│   │   ├── product/      # Componentes de produto
│   │   └── ui/           # Componentes de UI compartilhados
│   ├── lib/              # Funções e utilitários
│   │   ├── supabase.ts   # Cliente Supabase
│   │   └── utils.ts      # Funções utilitárias
│   ├── store/            # Estado global (Zustand)
│   └── types/            # Tipos TypeScript
├── supabase/             # Configuração do Supabase
│   └── migrations/       # Migrações SQL
├── .env.local            # Variáveis de ambiente
└── ...                   # Arquivos de configuração
```

## Começando

### Pré-requisitos

- Node.js 18+ instalado
- Uma conta no Supabase (https://supabase.com)

### Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd cardapio-digital
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

3. Configure as variáveis de ambiente: (já configurado)
```
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://tcbketwbrlawpbktasva.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_SUPABASE_PROJECT_ID=tcbketwbrlawpbktasva
NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

5. Acesse o aplicativo em [http://localhost:3000](http://localhost:3000)

## Banco de Dados

O projeto utiliza o Supabase como banco de dados PostgreSQL. A estrutura de banco de dados é composta por:

- `categories`: Categorias dos produtos
- `products`: Produtos do cardápio
- `orders`: Pedidos realizados pelos clientes
- `order_items`: Itens de cada pedido
- `settings`: Configurações do sistema

A migração inicial já foi aplicada no seu projeto Supabase com ID: `tcbketwbrlawpbktasva`.

## Painel de Administração

O painel de administração está disponível em [http://localhost:3000/admin](http://localhost:3000/admin).

Para criar um usuário administrador, você pode usar a interface de autenticação do Supabase:

1. Acesse seu projeto no Supabase
2. Vá para Authentication > Users
3. Clique em "Add User" e crie um usuário com email e senha
4. Use essas credenciais para acessar o painel de administração

## Deploy

Para fazer o deploy do projeto, você pode usar a Vercel:

```bash
vercel
```

## Licença

Este projeto está licenciado sob a licença MIT.
