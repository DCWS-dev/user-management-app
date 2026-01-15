const fs = require('fs');
const path = require('path');

const projectRoot = process.cwd();

// Файлы для удаления (дубликаты .ts когда есть .tsx)
const filesToRemove = [
  'src/pages/users/index.ts',
  'src/pages/not-found/index.ts',
  'src/pages/login/index.ts',
  'src/shared/ui/Layout/index.ts',
  'src/shared/ui/Loader/index.ts',
  'src/shared/ui/Button/index.ts',
  'src/shared/ui/Input/index.ts',
  'src/shared/ui/Result/index.ts',
];

console.log('🧹 Очистка дублирующихся файлов...');

filesToRemove.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`✅ Удален: ${file}`);
  } else {
    console.log(`ℹ️  Не найден: ${file}`);
  }
});

// Создаем index.ts файлы для реэкспорта
const directoriesToFix = [
  'src/shared/ui/Layout',
  'src/shared/ui/Loader',
  'src/shared/ui/Button',
  'src/shared/ui/Input',
  'src/shared/ui/Result',
  'src/shared/ui/Empty',
];

console.log('\n📁 Создание index.ts файлов...');

directoriesToFix.forEach(dir => {
  const indexPath = path.join(projectRoot, dir, 'index.ts');
  const componentName = path.basename(dir);
  
  let content = '';
  if (componentName === 'Empty') {
    content = `export { Empty } from './Empty';\nexport type { EmptyProps } from 'antd';\n`;
  } else {
    content = `export { ${componentName} } from './${componentName}';\n`;
  }
  
  fs.writeFileSync(indexPath, content);
  console.log(`✅ Создан: ${dir}/index.ts`);
});

console.log('\n🎉 Исправления применены!');
console.log('Запустите: npm run type-check');