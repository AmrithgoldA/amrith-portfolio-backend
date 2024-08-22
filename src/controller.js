const client = require('../postgressDbClient');
const { mailer } = require('../utils/nodeMailer')

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

async function callMailer(req, res) {
    try {
        const contactDetails = {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message
        };

        const response = await mailer(contactDetails);
    }
    catch(error) {
        console.log('Error occured while sending mail')
    }
}

module.exports = {
    getUserSkills,
    getSocialLinks,
    callMailer
};
