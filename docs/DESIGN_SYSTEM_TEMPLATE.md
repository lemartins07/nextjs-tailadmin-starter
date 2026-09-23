# Atlas do design system do template

Este atlas registra padrões observados no código de `src/template`. É uma fonte de
referência visual, não uma autorização para importar componentes do template para
o produto. Antes de adaptar um padrão, abra os arquivos de prova apontados aqui.

## Fundamentos confirmados

O tema e os tokens estão definidos em
[`src/template/template.css`](../src/template/template.css). O CSS usa Tailwind CSS
v4, `font-outfit`, a variante `dark` baseada em `.dark *`, paletas `brand`, `gray`,
`success`, `error`, `warning` e `blue-light`, além de sombras `theme-xs` a
`theme-xl`. A classe `dark` é incluída ou removida no elemento raiz e a escolha é
persistida em `localStorage`; prova:
[`src/template/context/ThemeContext.tsx`](../src/template/context/ThemeContext.tsx).

Os breakpoints declarados são `2xsm` (375px), `xsm` (425px), `sm` (640px), `md`
(768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px) e `3xl` (2000px). O CSS também
declara os papéis tipográficos `title-2xl`, `title-xl`, `title-lg`, `title-md`,
`title-sm`, `theme-xl`, `theme-sm` e `theme-xs`; use-os somente após confirmar o
papel visual no componente de destino.

## Layout e navegação

O shell usa `min-h-screen`, sidebar, backdrop, cabeçalho e uma área principal que
anima sua margem esquerda. Em `lg`, a margem é 90px recolhida ou 290px expandida;
o conteúdo interno é centralizado, limitado por `max-w-(--breakpoint-2xl)` e usa
`p-4 md:p-6`. Prova:
[`src/template/layout/AppLayout.tsx`](../src/template/layout/AppLayout.tsx).

Para navegação lateral, preserve a separação entre item, estado ativo/inativo,
ícone e subitem. As utilities `menu-item*` e `menu-dropdown-item*` definidas no
CSS são a evidência para cores, hover e tema escuro; a estrutura e a expansão estão
em [`src/template/layout/AppSidebar.tsx`](../src/template/layout/AppSidebar.tsx).

## Superfícies e tipografia

O card de documentação é uma superfície branca com borda `gray-200`, raio
`rounded-2xl` e equivalentes escuros. Seu cabeçalho usa `px-6 py-5`, título
`text-base font-medium`; o corpo é separado por borda e usa `p-4 sm:p-6` com
`space-y-6`. Prova:
[`src/template/components/common/ComponentCard.tsx`](../src/template/components/common/ComponentCard.tsx).

Rótulos de campo usam `mb-1.5 block text-sm font-medium`, texto `gray-700` e
`gray-400` no tema escuro. Prova:
[`src/template/components/form/Label.tsx`](../src/template/components/form/Label.tsx).
Para título de página e trilha, abra
[`src/template/components/common/PageBreadCrumb.tsx`](../src/template/components/common/PageBreadCrumb.tsx)
e a página que o consome, em vez de inferir uma escala a partir deste atlas.

## Controles e feedback

O botão base oferece `primary` e `outline`, tamanhos `sm` e `md`, ícone no início
ou fim e estado desabilitado. Ambos usam alinhamento inline, `gap-2`,
`rounded-lg` e transição. O primário usa `brand-500`, sombra `theme-xs`, hover em
`brand-600` e fundo desabilitado `brand-300`; o outline aplica anel e variação
escura. Prova:
[`src/template/components/ui/button/Button.tsx`](../src/template/components/ui/button/Button.tsx).

O campo base ocupa toda a largura, tem altura `h-11`, raio `rounded-lg`, borda,
sombra `theme-xs`, foco com anel e quatro estados confirmados: padrão, erro,
sucesso e desabilitado. Erro e sucesso mudam borda, foco, texto e dica; a dica usa
`text-xs`. Prova:
[`src/template/components/form/input/InputField.tsx`](../src/template/components/form/input/InputField.tsx).
Para checkbox, radio, select, textarea, upload e agrupamentos, use as referências
em [`src/template/views/Forms/FormElements.tsx`](../src/template/views/Forms/FormElements.tsx)
e abra o exemplo específico no inventário.

Alertas têm variantes `success`, `error`, `warning` e `info`; cada uma combina
borda e superfície tonal com ícone correspondente, inclusive em tema escuro.
O conteúdo usa ícone, título, mensagem e link opcional. Prova:
[`src/template/components/ui/alert/Alert.tsx`](../src/template/components/ui/alert/Alert.tsx).
Para carregamento, escolha uma das variantes documentadas em
[`src/template/components/ui/spinner/index.tsx`](../src/template/components/ui/spinner/index.tsx);
para estados de página, abra `Success`, `NotFound`, `FiveZeroZero` ou
`FiveZeroThree` em `src/template/views/OtherPage/`.

## Sobreposições, tabelas e responsividade

O modal renderiza apenas quando aberto, fecha com Escape e clique no backdrop e
desabilita a rolagem do `body`. A superfície padrão tem largura total disponível,
raio `rounded-3xl` e fundo claro/escuro; a alternativa fullscreen ocupa toda a
tela. Prova:
[`src/template/components/ui/modal/index.tsx`](../src/template/components/ui/modal/index.tsx).
Antes de usar confirmação, formulário no modal ou centralização vertical, abra os
exemplos em `src/template/components/UiExample/ModalExample/`.

As primitivas de tabela são estruturais (`Table`, `TableHeader`, `TableBody`,
`TableRow`, `TableCell`) e deixam estilos para quem as compõe. Prova:
[`src/template/components/ui/table/index.tsx`](../src/template/components/ui/table/index.tsx).
Por isso, defina cabeçalho, linhas, ações e overflow a partir de um exemplo real:
[`src/template/components/tables/BasicTables/BasicTableOne.tsx`](../src/template/components/tables/BasicTables/BasicTableOne.tsx)
ou uma data table em `src/template/components/tables/DataTables/`.

## Receitas de composição

### Formulário em card

1. Abra `ComponentCard`, `Label` e `InputField`.
2. Use a superfície e a divisão de cabeçalho/corpo do card.
3. Empilhe grupos de campos com o espaçamento já visto no exemplo e aplique os
   estados nativos de erro/sucesso quando houver validação.
4. Confirme a composição em
   [`src/template/views/Forms/FormLayout.tsx`](../src/template/views/Forms/FormLayout.tsx).

### Lista ou tabela de dados

1. Abra a página de tabelas e a tabela específica mais próxima do caso de uso.
2. Reutilize a estrutura semântica de tabela; não trate a primitiva como um estilo
   completo.
3. Verifique no arquivo escolhido como ele acomoda ações e telas estreitas antes
   de adaptar a implementação.

### Ação destrutiva ou confirmação

1. Abra `ModalBasedAlerts.tsx` e o componente `Modal`.
2. Use o modal apenas com uma ação de fechamento definida; o template suporta
   backdrop e Escape.
3. Escolha as cores de feedback a partir de `Alert.tsx` e dos tokens existentes,
   sem criar uma paleta paralela.

## Limites conhecidos

Este atlas não fixa uma escala universal de grid, nem declara que toda página deve
usar um card, tabela ou modal. O template contém exemplos distintos; a referência
mais próxima continua sendo a fonte de verdade. Mudanças em `src/template`, em
`template.css` ou em componentes-base exigem executar `npm run template:map` e
revisar este atlas e `.agents/template-map.md` se a mudança alterar uma referência
ou recomendação.
