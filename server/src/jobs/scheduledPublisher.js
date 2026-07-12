import News from '../models/News.js';
import Blog from '../models/Blog.js';

let started = false;
let running = false;

async function publishDueNews() {
  if (running) return;
  running = true;
  try {
    const now = new Date();
    const newsItems = await News.find({
      status: { $in: ['Scheduled', 'Pending'] },
      scheduledPublishDate: { $lte: now }
    }).select('_id scheduledPublishDate').lean();

    const newsUpdates = newsItems.map((item) => ({
      updateOne: {
        filter: { _id: item._id },
        update: {
          $set: {
            status: 'Published',
            publishDate: item.scheduledPublishDate || now
          },
          $unset: { scheduledPublishDate: '' }
        }
      }
    }));

    if (newsUpdates.length) await News.bulkWrite(newsUpdates);

    const blogFilter = { status: 'Pending', scheduledPublishDate: { $lte: now } };
    const blogUpdate = {
      $set: { status: 'Published', publishDate: now },
      $unset: { scheduledPublishDate: '' }
    };
    await Blog.updateMany(blogFilter, blogUpdate);
  } finally {
    running = false;
  }
}

export function startScheduledPublisher() {
  if (started) return;
  started = true;
  publishDueNews().catch((error) => console.error('Scheduled publisher failed', error));
  setInterval(() => {
    publishDueNews().catch((error) => console.error('Scheduled publisher failed', error));
  }, 30 * 1000);
}
