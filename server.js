const http = require('http');
// const { url } = require('inspector');
// const { hrtime } = require('process');

// const server = http.createServer((req, res) => {
    
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('X-Powered-By', 'Node.js');

//     res.writeHead(404,{
//         'Content-Type': 'application/json',
//         'X-Powered-By': 'Node.js',
//     });

//     let body = [];

//     req
//     .on('data', chunk => {
//         body.push(chunk);
//     })
//     .on('end',() => {
//         body = Buffer.concat(body).toString();
//         console.log(body);
//     });

//     const data = JSON.stringify({
//         success:true,
//         error: 'Not Found',
//         data: null,
//     });

//     res.end(data);

// });

const todos =[
    {id: 1, Text:'todo one'},
    {id: 2, Text:'todo two'},
    {id: 3, Text:'todo three'},
];

const server = http.createServer((req, res) =>{
    //listen data from client
    const {method, url} = req;
    let body = [];

req.on('data', chunk =>{
    body.push(chunk);
}).on ('end', () => {
    body = Buffer.concat(body).toString();

    let status = 404;
    const response ={
        succes: false,
        results:[],
        error:''
    };

    if (method === 'GET' && url === '/todos'){

        status = 200;
        response.success = true;
        response.results = todos;
    } else if (method === 'POST' && url === '/todos') {
        const {id,text} = JSON.parse(body);

        if (!id || !text){
            status = 400;
            response.error = 'please add id and text';
        } else{
            todos.push({id, text});
            status = 201;
            response.success = true;
            response.results = todos;
        }
    }

    res.writeHead(status,{
        'Content-Type' : 'application/json',
        'X-Powered-By' : 'Node.js'
    });
    res.end(JSON.stringify(response));
});
});

const PORT = 5000;

server.listen(PORT,() => console.log(`Server running on port ${PORT}`));
