import handleAsyncError from '../middlewares/handleAsyncError.js';

export const submitContact = handleAsyncError(async (req, res, next) => {
    const { name, email, mobile, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    // TODO: persist to DB or send email. For now, accept and return success.

    res.status(200).json({ success: true, message: 'Contact message received' });
});
