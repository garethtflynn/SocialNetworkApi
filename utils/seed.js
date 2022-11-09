const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { username, email, thoughts } = require("./data");

connection.on("error", (err) => err);
connection.once("open", async () => {
  await User.deleteMany({});
  await Thought.deleteMany({});

  const user = [];

  function userData() {
    for (var i = 0; i < username.length; i++) {
      const userObj = {
        username: username[i],
        email: email[i],
      };
      user.push(userObj);
    }
  }

  userData();

  await User.collection.insertMany(user);
  console.table(user);
  console.log("USER SEEDED");

  const thought = [];

  function thoughtData() {
    for (var i = 0; i < thought.length; i++) {
      const thoughtObj = {
        username: username[i],
        thought: thoughts[i],
      };
      thought.push(thoughtObj);
    }
  }

  thoughtData();

  await Thought.collection.insertMany(thought);
  console.table(thought);
  console.log("THOUGHTS SEEDED");
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
