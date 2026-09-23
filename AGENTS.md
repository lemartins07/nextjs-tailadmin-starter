# Referências de UI

Em uma mudança de interface, consulte primeiro `.agents/template-map.md` e abra
os arquivos de referência que ele indica antes de implementar. Use
`docs/DESIGN_SYSTEM_TEMPLATE.md` somente quando a tarefa exigir decidir entre
padrões, tokens ou uma composição não coberta pelo mapa. O índice completo está
em `.agents/template-index.generated.md`.

O template é fonte de referência visual: não importe código de `src/template`
para o produto. Ao alterar `src/template`, `src/template/template.css` ou a
configuração visual, execute `npm run template:map`, confira o diff e atualize o
mapa e o atlas afetados. Use `npm run template:map:check` para verificar que o
índice versionado está atualizado.
