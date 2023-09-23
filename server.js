const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Determina o caminho do arquivo com base na URL
    const filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);

    // Verifica se o arquivo existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404);
            res.end('Não encontrado');
            return;
        }

        // Read and serve the requested file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
            } else {
                res.writeHead(200, {
                    'Content-Type': getContentType(filePath),
                });
                res.end(data);
            }
        });
    });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});

// Função que determina o content-type baseado na extensão
function getContentType(filePath) {
    const extname = path.extname(filePath);
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.css':
            return 'text/css';
        case '.js':
            return 'application/javascript';
        default:
            return 'application/octet-stream';
    }
}

