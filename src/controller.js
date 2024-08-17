const client = require('../postgressDbClient');

async function getUserSkills(req, res) {
    try {
        const response = await client.query('SELECT * FROM userskills');
        res.json(response.rows);
    } catch {
        console.error('Error fetching user skills:');
        res.status(500).send('Internal Server Error');
    }
}

async function getSocialLinks(req, res) {
    try {
        const response = await client.query('SELECT * FROM sociallinks')
        res.json(response.rows);
    }
    catch (error) {
        console.error('Error fetching social links');
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getUserSkills,
    getSocialLinks
};
