
export function generateBoilerplate(title, callbackFunction, data) {

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title}</title>
        <script type="module" src="./public/scripts.js"
      </head>
      <body>
      </body>
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
  return '<h1>Index</h1>';
}

export function generateLeikir(data) {
  console.log(data);
  return `<h1>Leikir</h1>
  `;
}

export function generateStada(data) {
  console.log(data);
  return '<h1>Staða</h1>';
}

