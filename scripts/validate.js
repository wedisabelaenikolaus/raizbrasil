#!/usr/bin/env node
// Lightweight offline validation: JSON files parse, JS files are syntactically valid,
// every section/snippet referenced from JSON templates exists, CSS braces balance.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
let errors = 0;
const fail = (m) => { errors++; console.error('✗', m); };
const list = (d, ext) => fs.readdirSync(path.join(root, d)).filter((f) => f.endsWith(ext)).map((f) => path.join(d, f));

for (const f of [...list('templates', '.json'), ...list('sections', '.json'), ...list('config', '.json'), ...list('locales', '.json')]) {
  try { JSON.parse(fs.readFileSync(path.join(root, f), 'utf8')); } catch (e) { fail(`${f}: ${e.message}`); }
}
for (const f of list('assets', '.js')) {
  try { execFileSync(process.execPath, ['--check', path.join(root, f)], { stdio: 'pipe' }); } catch (e) { fail(`${f}: syntax error`); }
}
for (const f of list('assets', '.css')) {
  const s = fs.readFileSync(path.join(root, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const o = (s.match(/{/g) || []).length, c = (s.match(/}/g) || []).length;
  if (o !== c) fail(`${f}: unbalanced braces (${o} vs ${c})`);
}
const sections = new Set(list('sections', '.liquid').map((f) => path.basename(f, '.liquid')));
for (const f of [...list('templates', '.json'), ...list('sections', '.json')]) {
  const d = JSON.parse(fs.readFileSync(path.join(root, f), 'utf8'));
  for (const [id, s] of Object.entries(d.sections || {})) {
    if (!sections.has(s.type)) fail(`${f}: section "${id}" uses missing type "${s.type}"`);
  }
}
if (!fs.existsSync(path.join(root, 'locales/en.default.json'))) fail('locales/en.default.json missing (English must be default)');
console.log(errors ? `\n${errors} problem(s)` : '✓ JSON, JS, CSS and template references look valid');
process.exit(errors ? 1 : 0);
