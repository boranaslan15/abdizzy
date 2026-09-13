// Extracts the Claude Design bundle (deploy/index.html) into unpacked/: assets by uuid + template.html.
const fs = require('fs'), zlib = require('zlib');
const h = fs.readFileSync('deploy/index.html', 'utf8');
const get = t => { const open = '<script type="__bundler/' + t + '">'; const i = h.indexOf(open) + open.length; return h.slice(i, h.indexOf('</script>', i)).trim(); };
const man = JSON.parse(get('manifest'));
for (const [u, e] of Object.entries(man)) {
  let b = Buffer.from(e.data, 'base64');
  if (e.compressed) b = zlib.gunzipSync(b);
  fs.writeFileSync('unpacked/' + u, b);
}
fs.writeFileSync('unpacked/template.html', JSON.parse(get('template')));
console.log('unpacked', Object.keys(man).length, 'assets + template.html');
