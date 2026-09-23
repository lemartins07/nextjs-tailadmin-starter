import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { relative, resolve, sep } from 'node:path';
import process from 'node:process';

const repositoryRoot = resolve(import.meta.dirname, '..');
const templateRoot = resolve(repositoryRoot, 'src/template');
const outputPath = resolve(repositoryRoot, '.agents/template-index.generated.md');
const sourceExtensions = new Set(['.css', '.svg', '.ts', '.tsx']);
const checkOnly = process.argv.includes('--check');
const invalidArguments = process.argv.slice(2).filter((argument) => argument !== '--check');

if (invalidArguments.length > 0) {
  console.error(`Argumentos não reconhecidos: ${invalidArguments.join(', ')}`);
  process.exitCode = 1;
} else {
  const files = await collectFiles(templateRoot);
  const inventory = await Promise.all(
    files.map(async (file) => ({
      path: toRepositoryPath(file),
      category: categoryFor(file),
      exports: await exportedSymbols(file),
    })),
  );
  const content = render(inventory);

  if (checkOnly) {
    let current = '';
    try {
      current = await readFile(outputPath, 'utf8');
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }

    if (current !== content) {
      console.error(
        '.agents/template-index.generated.md está desatualizado. Execute npm run template:map.',
      );
      process.exitCode = 1;
    }
  } else {
    await mkdir(resolve(repositoryRoot, '.agents'), { recursive: true });
    await writeFile(outputPath, content, 'utf8');
    console.log(`Índice gerado: ${toRepositoryPath(outputPath)}`);
  }
}

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .sort((left, right) => compare(left.name, right.name))
      .map(async (entry) => {
        const path = resolve(directory, entry.name);
        if (entry.isDirectory()) return collectFiles(path);
        return sourceExtensions.has(extension(entry.name)) ? [path] : [];
      }),
  );

  return nested.flat();
}

async function exportedSymbols(file) {
  if (extension(file) === '.svg' || extension(file) === '.css') return [];

  const source = await readFile(file, 'utf8');
  const symbols = new Set();
  if (/export\s+default\b/.test(source)) symbols.add('default');

  for (const match of source.matchAll(
    /export\s+(?:const|function|class|type|interface)\s+([A-Za-z_$][\w$]*)/g,
  )) {
    symbols.add(match[1]);
  }

  for (const match of source.matchAll(/export\s*{([^}]+)}/g)) {
    for (const item of match[1].split(',')) {
      const symbol = item.trim().split(/\s+as\s+/).at(-1)?.trim();
      if (symbol) symbols.add(symbol);
    }
  }

  return [...symbols].sort(compare);
}

function categoryFor(file) {
  const path = toRepositoryPath(file);
  if (path === 'src/template/App.tsx' || path === 'src/template/template.css') {
    return 'Shell e estilos globais';
  }
  if (path.includes('/layout/') || path.includes('/context/')) return 'Shell e navegação';
  if (path.includes('/views/')) return 'Páginas de referência';
  if (path.includes('/components/ui/')) return 'Componentes de UI';
  if (path.includes('/components/form/')) return 'Formulários';
  if (path.includes('/components/tables/')) return 'Tabelas';
  if (path.includes('/components/cards/')) return 'Cards';
  if (path.includes('/components/charts/')) return 'Gráficos';
  if (path.includes('/icons/')) return 'Ícones';
  if (path.includes('/hooks/')) return 'Hooks';
  if (path.includes('/components/')) return 'Componentes de domínio';
  return 'Suporte';
}

function render(inventory) {
  const categories = new Map();
  for (const item of inventory) {
    const entries = categories.get(item.category) ?? [];
    entries.push(item);
    categories.set(item.category, entries);
  }

  const lines = [
    '# Índice técnico do template',
    '',
    '<!-- Gerado por scripts/generate-template-map.mjs. Não editar manualmente. -->',
    '',
    `Arquivos inventariados: ${inventory.length}. Caminhos são relativos à raiz do repositório.`,
    '',
  ];

  for (const [category, entries] of categories) {
    lines.push(`## ${category} (${entries.length})`, '');
    for (const item of entries) {
      const exportText = item.exports.length > 0 ? ` — exports: ${item.exports.join(', ')}` : '';
      lines.push(`- \`${item.path}\`${exportText}`);
    }
    lines.push('');
  }

  return `${lines.join('\n')}\n`;
}

function extension(path) {
  const index = path.lastIndexOf('.');
  return index === -1 ? '' : path.slice(index);
}

function compare(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function toRepositoryPath(path) {
  return relative(repositoryRoot, path).split(sep).join('/');
}
