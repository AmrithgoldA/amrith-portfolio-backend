const client = require('../postgressDbClient');

async function getUserSkills(req, res) {
    try {
        const result = await client.query('SELECT * FROM userskills');
        console.error('data:', result.rows);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching user skills:', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getUserSkills,
};
