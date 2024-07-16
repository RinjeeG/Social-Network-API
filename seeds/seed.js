const mongoose = require('mongoose');
const { User, Thought } = require('../models');

const usersData = [
  {
    username: 'user1',
    email: 'user1@example.com',
    thoughts: [
      { thoughtText: 'This is a thought by user1' },
      { thoughtText: 'Another thought by user1' }
    ],
    friends: [] // Friends will be added later
  },
  {
    username: 'user2',
    email: 'user2@example.com',
    thoughts: [
      { thoughtText: 'This is a thought by user2' },
      { thoughtText: 'Another thought by user2' }
    ],
    friends: [] // Friends will be added later
  },
  {
    username: 'user3',
    email: 'user3@example.com',
    thoughts: [
      { thoughtText: 'This is a thought by user3' },
      { thoughtText: 'Another thought by user3' }
    ],
    friends: [] // Friends will be added later
  }
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = [];

    // Create users and their thoughts
    for (const userData of usersData) {
      const { _id: userId } = await User.create({
        username: userData.username,
        email: userData.email,
      });

      createdUsers.push({ ...userData, _id: userId });

      const thoughts = userData.thoughts.map(thought => ({
        ...thought,
        username: userData.username,
        userId: userId
      }));

      const createdThoughts = await Thought.insertMany(thoughts);

      await User.updateOne({ _id: userId }, { $push: { thoughts: { $each: createdThoughts.map(thought => thought._id) } } });
    }

    // Add friends to users
    const user1 = createdUsers.find(user => user.username === 'user1');
    const user2 = createdUsers.find(user => user.username === 'user2');
    const user3 = createdUsers.find(user => user.username === 'user3');

    await User.updateOne({ _id: user1._id }, { $push: { friends: user2._id } });
    await User.updateOne({ _id: user2._id }, { $push: { friends: [user1._id, user3._id] } });
    await User.updateOne({ _id: user3._id }, { $push: { friends: user2._id } });

    console.log('Database seeded successfully');
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    mongoose.connection.close();
  }
};

seedDatabase();
