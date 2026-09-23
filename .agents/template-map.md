# Mapa semântico do template

Abra esta página primeiro em tarefas de UI; depois inspecione os arquivos indicados
antes de adaptar qualquer padrão. Não importe código de `src/template` para o produto.

| Necessidade | Referências iniciais | Observações |
| --- | --- | --- |
| Shell com sidebar, header e conteúdo responsivo | `src/template/layout/AppLayout.tsx`, `AppSidebar.tsx`, `AppHeader.tsx` | Sidebar muda entre 90 e 290px a partir de `lg`; veja o contexto. |
| Página, título e breadcrumb | `src/template/views/Blank.tsx`, `src/template/components/common/PageBreadCrumb.tsx` | Use o contêiner do layout como referência. |
| Card de conteúdo ou ação | `src/template/components/common/ComponentCard.tsx`, `src/template/views/UiElements/Cards.tsx` | Consulte a receita “Card” no atlas. |
| Botão, inclusive com ícone | `src/template/components/ui/button/Button.tsx`, `src/template/views/UiElements/Buttons.tsx` | Há variantes `primary`, `outline` e tamanhos `sm`, `md`. |
| Formulário, validação ou campo com ícone | `src/template/components/form/input/InputField.tsx`, `src/template/components/form/form-elements/InputStates.tsx`, `src/template/views/Forms/FormLayout.tsx` | Erro, sucesso e desabilitado são implementados. |
| Tabela ou paginação | `src/template/views/Tables/BasicTables.tsx`, `src/template/components/tables/BasicTables/BasicTableOne.tsx`, `src/template/views/Tables/DataTables.tsx` | Abra a tabela específica antes de decidir o overflow/responsividade. |
| Modal ou confirmação | `src/template/components/ui/modal/index.tsx`, `src/template/components/UiExample/ModalExample/ModalBasedAlerts.tsx` | Fecha por backdrop e Escape; bloqueia rolagem. |
| Alerta, loading, erro ou sucesso | `src/template/components/ui/alert/Alert.tsx`, `src/template/components/ui/spinner/index.tsx`, `src/template/views/OtherPage/Success.tsx`, `src/template/views/OtherPage/NotFound.tsx` | Veja estados confirmados no atlas. |
| Navegação secundária, tabs, dropdown ou popover | `src/template/components/ui/tabs/index.tsx`, `src/template/components/ui/dropdown/Dropdown.tsx`, `src/template/components/ui/popover/Popover.tsx` | Mantenha estados aberto/fechado acessíveis. |
| Ícone | `src/template/icons/index.ts`, `src/template/icons/` | Ícones SVG locais exportados pelo índice. |
| Tema escuro e tokens | `src/template/template.css`, `src/template/context/ThemeContext.tsx` | O template usa a classe `.dark`; não deduza tokens fora do CSS. |

Para uma composição inédita ou uma decisão de token, consulte
`docs/DESIGN_SYSTEM_TEMPLATE.md`. Para o inventário completo, consulte
`.agents/template-index.generated.md`.
