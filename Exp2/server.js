const http = require('http');
const url = require('url');
const PORT = 3000;

let todos = [];
let currentId = 1;

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });
        req.on('error', reject);
    });
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
}

function extractId(pathname) {
    const matches = pathname.match(/^\/todos\/(\d+)$/);
    return matches ? parseInt(matches[1]) : null;
}

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    try {
        if (method === 'GET' && pathname === '/todos') {
            sendJSON(res, 200, todos);
        }
        
        else if (method === 'GET' && pathname.startsWith('/todos/')) {
            const id = extractId(pathname);
            if (!id) {
                sendJSON(res, 400, { message: 'Invalid ID' });
                return;
            }
            
            const todo = todos.find(item => item.id === id);
            if (!todo) {
                sendJSON(res, 404, { message: 'Item not found' });
                return;
            }
            sendJSON(res, 200, todo);
        }
        
        else if (method === 'POST' && pathname === '/todos') {
            const body = await parseBody(req);
            const { title, completed = false } = body;
            
            if (!title) {
                sendJSON(res, 400, { message: 'Title is required' });
                return;
            }
            
            const newTodo = { id: currentId++, title, completed };
            todos.push(newTodo);
            sendJSON(res, 201, newTodo);
        }
        
        else if (method === 'PUT' && pathname.startsWith('/todos/')) {
            const id = extractId(pathname);
            if (!id) {
                sendJSON(res, 400, { message: 'Invalid ID' });
                return;
            }
            
            const todo = todos.find(item => item.id === id);
            if (!todo) {
                sendJSON(res, 404, { message: 'Item not found' });
                return;
            }
            
            const body = await parseBody(req);
            const { title, completed } = body;
            
            if (title !== undefined) {
                todo.title = title;
            }
            if (completed !== undefined) {
                todo.completed = completed;
            }
            
            sendJSON(res, 200, todo);
        }
        
        else if (method === 'DELETE' && pathname.startsWith('/todos/')) {
            const id = extractId(pathname);
            if (!id) {
                sendJSON(res, 400, { message: 'Invalid ID' });
                return;
            }
            
            const index = todos.findIndex(item => item.id === id);
            if (index === -1) {
                sendJSON(res, 404, { message: 'Item not found' });
                return;
            }
            
            const deleted = todos.splice(index, 1);
            sendJSON(res, 200, { message: 'Item deleted', item: deleted[0] });
        }
        
        else {
            sendJSON(res, 404, { message: 'Route not found' });
        }
        
    } catch (error) {
        console.error('Server error:', error);
        sendJSON(res, 500, { message: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

server.on('error', (error) => {
    console.error('Server error:', error);
});