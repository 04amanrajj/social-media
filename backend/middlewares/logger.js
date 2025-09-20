const db = require('../config/db');

async function logToDB(level, message, meta = {}) {
  try {
    await db('logs').insert({
      level,
      message,
      meta: JSON.stringify(meta)
    });
  } catch (err) {
    console.error('Failed to log to DB:', err);
  }
}

// Express middleware to log all requests
function requestLogger(req, res, next) {
  const start = Date.now();

  // When response finishes, log to DB
  res.on('finish', () => {
    const duration = Date.now() - start;
    logToDB('info', 'HTTP request', {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration_ms: duration,
      ip: req.ip
    });
  });

  next();
}

module.exports = { requestLogger, logToDB };
