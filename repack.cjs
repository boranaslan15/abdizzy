// Rebuilds deploy/index.html from unpacked/template.html (the editable game source).
const fs = require('fs');
const src = fs.readFileSync('unpacked/index.original.html', 'utf8');
const tpl = fs.readFileSync('unpacked/template.html', 'utf8');
const open = '<script type="__bundler/template">';
const i = src.indexOf(open) + open.length;
const j = src.indexOf('</script>', i);
// escape "</" so the embedded HTML can't close the surrounding <script> tag
const json = JSON.stringify(tpl).split('</').join('<\\u002F');
fs.writeFileSync('deploy/index.html', src.slice(0, i) + '\n' + json + '\n  ' + src.slice(j));
console.log('wrote deploy/index.html');
