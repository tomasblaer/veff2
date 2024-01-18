import { parseGamedays } from './json.js';

export function generateBoilerplate(title, callbackFunction, data) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <script type="module" src="./public/scripts.js"></script>
    </head>
  </html>
  <body>
    <div id="nav">
      <ul>
        <li>
          <a href="index.html">Forsíða</a>
        </li>
        <li>
          <a href="leikir.html">Leikir</a>
        </li>
        <li>
          <a href="stada.html">Staða</a>
        </li>
      </ul>
    </div>
    <div id="main">
      ${callbackFunction.name !== 'generateIndex' ? callbackFunction(data) : callbackFunction()}
    </div>
  </body>
`;
}

export function generateIndex() {
  return `
    <div id="header">
      <h1>Forsíða</h1>
    </div>
    <div id="content">
      <p>Þetta er forsíða</p>
    </div>
`;
}

export function generateLeikir(data) {
  return `
    <div id="header">
      <h1>Leikir</h1>
    </div>
    <div id="content">
      <p>Content</p>
    </div>
  `;
}

async function stoduTable(data) {
  const res = await parseGamedays(data);
  return '<p>Todo</p>'
}

export function generateStada(data) {
  return `
    <div id="header">
      <h1>Staða</h1>
    </div>
    <div id="content">
      ${stoduTable(data)}
    </div>
  `;
}

