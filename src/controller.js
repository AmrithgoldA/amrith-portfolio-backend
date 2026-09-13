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
    const { name, email, subject, message } = req.body || {};

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Name, email and message are required' });
    }

    try {
        const enquiryId = await mailer({ name, email, subject, message });
        res.status(200).json({ enquiryId });
    }
    catch(error) {
        console.error('Error occured while sending mail:', error);
        res.status(500).send('Failed to send mail');
    }
}

async function getProjectDetails(req, res) {
    try {
        const response = await client.query('SELECT * FROM projects')
        res.json(response.rows);
    }
    catch (error) {
        console.error('Error fetching social links');
        res.status(500).send('Internal Server Error');
    }
}

async function getCarrierDetails(req, res) {
    try {
        const response = await client.query('SELECT * FROM JobExperience')
        res.json(response.rows);
    }
    catch (error) {
        console.error('Error fetching social links');
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getUserSkills,
    getSocialLinks,
    callMailer,
    getProjectDetails,
    getCarrierDetails
};
