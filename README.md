# Mundi 🌍

## Sobre o app

**Mundi** é um aplicativo mobile desenvolvido com **React Native** e **Expo**, voltado para o **registro e planejamento de viagens**.

**Vídeo do protótipo:**
Segue o link do vídeo demonstrando o funcionamento do protótipo do aplicativo: [link](https://youtube.com/shorts/smFcdU0jQpg)
Segue o link da defesa do projeto: 
## Imagens
<img width="1080" height="1080" alt="Milena Hamerski - Mundi" src="https://github.com/user-attachments/assets/6a49cfb2-baf6-4422-aa2a-ef63feac329e" />
<div style="display: flex; justify-content: space-between; flex-wrap: wrap;">
  <img src="https://github.com/user-attachments/assets/9e7ea629-0136-4aca-aa09-1475f322d47e" style="width:16%;" />
  <img src="https://github.com/user-attachments/assets/ef6c1674-2e96-4626-8e9f-f503556c9fdb" style="width:16%;" />
  <img src="https://github.com/user-attachments/assets/67a4ff4a-e703-454e-a81a-8b6cd297d7a7" style="width:16%;" />
  <img src="https://github.com/user-attachments/assets/9d643f03-b2db-42f5-a53f-2768347a0cf8" style="width:16%;" />
  <img src="https://github.com/user-attachments/assets/f480bbe8-f263-418f-8ef7-dc0c812c123a" style="width:16%;" />
  <img src="https://github.com/user-attachments/assets/cdf5d36c-2897-4104-ade0-aa6f89b83b4a" style="width:16%;" />
</div>

---
Com ele, você pode:

- Registrar destinos e datas das suas viagens
- Adicionar observações e notas pessoais
- Visualizar um histórico das suas experiências
- Planejar futuras aventuras pelo mundo

### Funcionalidades principais (MVP)

- Cadastro de usuário
- Login/autenticação
- Integração com Supabase
- Registro de novas viagens (destino, data, observações)
- Visualização da lista de viagens anteriores
- Edição/remoção de viagens salvas

### Funcionalidades adicionais (trabalhos futuros)

- Upload de fotos das viagens
- Notificações sobre viagens próximas
- Modo escuro (Dark Mode)
- Compartilhamento de roteiros com outros usuários
- Sugestão de destinos com base no histórico do usuário
- Upload de fotos das viagens
- Notificações sobre viagens próximas
- Modo escuro (Dark Mode)
- Compartilhamento de roteiros com outros usuários
- Sugestão de destinos com base no histórico do usuário

---

## Protótipos de tela

Os protótipos foram desenvolvidos no Figma e estão disponíveis para visualização pública no link abaixo:

[Clique aqui para visualizar os protótipos no Figma](https://www.figma.com/design/0VQlP8P0Y4WE1c2G3n3YZw/mobile?node-id=0-1&p=f&t=hq6lA7psdH4Cg3C4-0)

---

## Modelagem do banco de dados

O app Mundi utilizará o banco de dados do Supabase (solução baseada em SQL) para armazenar as informações dos usuários e suas viagens.
Para este trabalho, utilizei a documentação do [Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native), assim como o repositório [Expo Supabase Starter](https://github.com/flemingvincent/expo-supabase-starter)
Para este trabalho, utilizei a documentação do [Supabase](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native), assim como o repositório [Expo Supabase Starter](https://github.com/flemingvincent/expo-supabase-starter)

### Link para visualização da modelagem no diagrams.net

[Visualizar modelagem do banco de dados](https://drive.google.com/file/d/1l2Onv3uUJZcMsfiLDRD30OCM4J1D9LQR/view?usp=sharing)

## Planejamento de Sprints

Mais informações sobre as tarefas e progresso estão disponíveis em [Project DPDM](https://github.com/users/milenahamerski/projects/3).

### Sprint 1 – Setup & Autenticação ~ 2 semanas

**Objetivo:** Criar a base do projeto e permitir cadastro/login de usuários.

- [x] Configuração inicial do app (Expo + React Native + TypeScript)
- [x] Integração com backend + [Supabase](https://supabase.com/docs)
- [x] Cadastro de usuário
- [x] Login/autenticação
- [x] Navegação inicial

### Sprint 2 – CRUD de Viagens ~ 2 semanas

**Objetivo:** Permitir ao usuário registrar e gerenciar viagens.

- [x] Registro de novas viagens (destino, data, observações)
- [x] Listagem de viagens
- [x] Detalhes de uma viagem
- [x] Edição de viagens salvas
- [x] Exclusão de viagens

### Sprint 3 – Histórico & UX ~ 1.5 semanas

**Objetivo:** Melhorar a experiência do usuário e histórico de viagens.

- [ ] Tela de histórico de viagens anteriores
- [x] Ajustes de UI seguindo protótipo do Figma
- [x] Validações de formulários
- [x] Feedback visual (loading, mensagens, toasts)

### Sprint 4 – Testes, Documentação & Publicação ~ 2 semanas

**Objetivo:** Preparar o app para entrega e publicação inicial.

- [ ] Escrita de testes básicos (unitários e integração)
- [x] Documentação do projeto (README, Wiki)
- [x] Deploy

## Atualizações desde o último checkpoint (Checkpoint 2 - 12/10/2025):
- Toda a parte de autenticação, incluindo a criação de novos usuários no banco, bem como a validação para verificar se o usuário já existe no sistema.
- Adição do Expo Router e configuração das rotas, já implementando o fluxo index → autenticação → home (área protegida).
- Criação de componentes reutilizáveis, além da tela de viagens, que será utilizada dentro da área protegida, embora ainda **não** esteja vinculada ao fluxo principal.
- Implementação do NativeWind para padronizar os componentes customizáveis, com refatoração em andamento, pois os componentes foram originalmente criados para a disciplina de **Mobile 1**.

## Atualizações desde o último checkpoint (Checkpoint Final - 23/11/2025):
- Integração completa com OpenStreetMap via Expo Leaflet para visualização de mapas e geolocalização de viagens.
- Implementação do CRUD de viagens, permitindo criar, editar, visualizar e deletar registros de viagens com detalhes, datas e notas.
- Validação de formulários utilizando Zod, garantindo dados consistentes e seguros ao inserir ou editar informações do usuário e das viagens.
- Estruturação da tela de perfil, com upload de fotos de usuário usando Supabase Storage, além de atualização em tempo real da imagem de perfil.
- Implementação de filtragem e busca de viagens em tempo real, proporcionando melhor experiência de navegação para o usuário.

## Sobre **“Boas práticas para a criação de componentes reutilizáveis”**, alguns conceitos importantes da aula incluem:

- Separação de responsabilidades: cada componente deve ter uma função clara e única.
- Propagação de propriedades (props): permitir que componentes recebam dados e comportamentos externos de forma flexível.
- Estilização consistente: usar padrões de estilos ou bibliotecas (como Tailwind/NativeWind) para manter a consistência visual.
- Reutilização: criar componentes que possam ser usados em diferentes telas ou fluxos sem duplicação de código.
- Composição: combinar componentes menores para construir interfaces mais complexas, em vez de criar grandes componentes monolíticos.

## Executando o projeto
Siga os passos abaixo para rodar o app Mundi localmente.

1. Clonar o repositório
```bash
git clone https://github.com/milenahamerski/dpdm
cd dpdm
```

2. Instalar dependências

Certifique-se de ter o Node.js e npm/yarn instalados. Depois execute:
```bash
npm install
# ou
yarn install
```

3. Configurar variáveis de ambiente

Crie um arquivo .env na raiz do projeto com as credenciais do Supabase:
```env
SUPABASE_URL=seu_supabase_url
SUPABASE_ANON_KEY=sua_supabase_anon_key
```

Substitua seu_supabase_url e sua_supabase_anon_key pelos valores do seu projeto no Supabase.

4. Iniciar o servidor de desenvolvimento
```
npm start
# ou
yarn start
```

Isso abrirá o Expo DevTools no navegador.

5. Rodar o app

Você tem duas opções:

No celular (recomendado):
Baixe o app Expo Go e escaneie o QR code exibido no DevTools.

Em emulador Android:
Certifique-se de ter o Android Studio instalado e o emulador rodando. Pressione a no terminal.

6. Uso do app

Cadastre-se ou faça login para acessar seu perfil.

Faça upload da foto de perfil.

Crie, edite e visualize suas viagens.

Use a barra de busca para filtrar viagens em tempo real.

Veja a localização das viagens no mapa (via Expo Leaflet + OpenStreetMap).
