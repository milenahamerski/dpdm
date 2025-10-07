# Mundi 🌍

## Sobre o app

**Mundi** é um aplicativo mobile desenvolvido com **React Native** e **Expo**, voltado para o **registro e planejamento de viagens**.

Com ele, você pode:

- Registrar destinos e datas das suas viagens
- Adicionar observações e notas pessoais
- Visualizar um histórico das suas experiências
- Planejar futuras aventuras pelo mundo

### Funcionalidades principais (MVP)

- [ ] Cadastro de usuário
- [ ] Login/autenticação
- [ ] Registro de novas viagens (destino, data, observações)
- [ ] Visualização da lista de viagens anteriores
- [ ] Edição/remoção de viagens salvas
- [ ] Integração com banco de dados MongoDB

### Funcionalidades adicionais (trabalhos futuros)

- [ ] Upload de fotos das viagens
- [ ] Notificações sobre viagens próximas
- [ ] Modo escuro (Dark Mode)
- [ ] Compartilhamento de roteiros com outros usuários
- [ ] Sugestão de destinos com base no histórico do usuário

---

## Protótipos de tela

Os protótipos foram desenvolvidos no Figma e estão disponíveis para visualização pública no link abaixo:

[Clique aqui para visualizar os protótipos no Figma](https://www.figma.com/design/0VQlP8P0Y4WE1c2G3n3YZw/mobile?node-id=0-1&p=f&t=hq6lA7psdH4Cg3C4-0)

---

## Modelagem do banco de dados

O app Mundi utilizará o banco de dados do Supabase (solução baseada em SQL) para armazenar as informações dos usuários e suas viagens.

### Link para visualização da modelagem no diagrams.net

[Visualizar modelagem do banco de dados](https://drive.google.com/file/d/1l2Onv3uUJZcMsfiLDRD30OCM4J1D9LQR/view?usp=sharing)

## Planejamento de Sprints
Mais informações sobre as tarefas e progresso estão disponíveis em [Project DPDM](https://github.com/users/milenahamerski/projects/3).

### Sprint 1 – Setup & Autenticação ~ 2 semanas
**Objetivo:** Criar a base do projeto e permitir cadastro/login de usuários.  
- Configuração inicial do app (Expo + React Native + TypeScript)  
- Integração com backend + [Supabase](https://supabase.com/docs)  
- Cadastro de usuário  
- Login/autenticação
- Navegação inicial

### Sprint 2 – CRUD de Viagens ~ 2 semanas
**Objetivo:** Permitir ao usuário registrar e gerenciar viagens.  
- Registro de novas viagens (destino, data, observações)  
- Listagem de viagens  
- Detalhes de uma viagem  
- Edição de viagens salvas  
- Exclusão de viagens  

### Sprint 3 – Histórico & UX ~ 1.5 semanas
**Objetivo:** Melhorar a experiência do usuário e histórico de viagens.  
- Tela de histórico de viagens anteriores  
- Ajustes de UI seguindo protótipo do Figma  
- Validações de formulários  
- Feedback visual (loading, mensagens, toasts)  

### Sprint 4 – Testes, Documentação & Publicação ~ 2 semanas
**Objetivo:** Preparar o app para entrega e publicação inicial.  
- Escrita de testes básicos (unitários e integração)  
- Documentação do projeto (README, Wiki)  
- Deploy
