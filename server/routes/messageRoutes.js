const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Get all conversations for a user
router.get('/conversations/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find distinct conversation partners
    // Optionally populate listing info if you store listingId in messages or elsewhere
    // Group messages by (senderId, recipientId) pairs where user is involved

    const conversations = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { recipientId: userId }
          ]
        }
      },
      {
        $sort: { createdAt: -1 } // latest first
      },
      {
        $group: {
          _id: {
            $cond: [
              { $eq: ["$senderId", userId] },
              "$recipientId",
              "$senderId"
            ]
          },
          lastMessage: { $first: "$text" },
          lastMessageAt: { $first: "$createdAt" },
          conversationWith: { $first: { $cond: [{ $eq: ["$senderId", userId] }, "$recipientId", "$senderId"] } },
        }
      }
    ]);

    res.json(conversations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
});

module.exports = router;