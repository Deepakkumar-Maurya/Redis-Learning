const express = require('express');
const axios = require('axios').default;
const client = require('./client');

const app = express();

app.get('/', async (req, res) => {
    // fetching the data from redis
    const cacheValue = await client.get('todos');
    if (cacheValue) {
        return res.json(JSON.parse(cacheValue));
    }

    const {data} = await axios.get('https://jsonplaceholder.typicode.com/todos');
    
    // storing the data in redis
    await client.set('todos', JSON.stringify(data));
    await client.expire('todos', 60);   // setting the expiratioon time
    return res.json(data);
});

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});