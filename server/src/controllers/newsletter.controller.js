import NewsletterSubscriber from '../models/NewsletterSubscriber.js';

export const subscribe = async (req, res) => {
  try {
    const { email, language = 'en', source = 'frontend' } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Check if already subscribed
    let subscriber = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
    
    if (subscriber) {
      // If they unsubscribed in the past, resubscribe them
      if (subscriber.status === 'Unsubscribed') {
        subscriber.status = 'Subscribed';
        subscriber.language = language;
        subscriber.source = source;
        await subscriber.save();
      }
      // If already subscribed, just return success (don't expose whether it existed or not)
      return res.status(200).json({ success: true, message: 'Subscribed successfully' });
    }

    subscriber = new NewsletterSubscriber({
      email,
      language,
      source,
      status: 'Subscribed'
    });
    
    await subscriber.save();

    res.status(201).json({ success: true, message: 'Subscribed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const search = req.query.search || '';

    const query = {};
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const total = await NewsletterSubscriber.countDocuments(query);
    const subscribers = await NewsletterSubscriber.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      success: true,
      data: {
        items: subscribers,
        meta: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const exportSubscribers = async (req, res) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 }).lean();
    
    const fields = ['email', 'status', 'language', 'source', 'createdAt'];
    
    // Generate CSV string manually
    const csvRows = [];
    csvRows.push(fields.join(','));
    
    for (const sub of subscribers) {
      const row = [
        `"${(sub.email || '').replace(/"/g, '""')}"`,
        `"${(sub.status || '').replace(/"/g, '""')}"`,
        `"${(sub.language || '').replace(/"/g, '""')}"`,
        `"${(sub.source || '').replace(/"/g, '""')}"`,
        `"${(sub.createdAt ? new Date(sub.createdAt).toISOString() : '').replace(/"/g, '""')}"`
      ];
      csvRows.push(row.join(','));
    }
    const csv = csvRows.join('\n');
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=subscribers.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};

export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!subscriber) {
      return res.status(404).json({ success: false, message: 'Subscriber not found' });
    }
    res.json({ success: true, message: 'Subscriber deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
};
