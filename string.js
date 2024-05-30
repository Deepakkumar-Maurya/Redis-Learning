const client = require('./client');

async function init() {
    await client.set('user:4', 'John Doe');
    // await client.expire('user:4', 10);
    const result = await client.get('user:4');
    console.log(result);
}

init();

