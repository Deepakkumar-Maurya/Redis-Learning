const client = require('./client');

async function init() {
    await client.lpush('messages', 'Hello World!')
    const result = await client.lpop('messages')
    console.log(result)
}
init();