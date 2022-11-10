const connection = require("../config/connection");
const { User, Thought } = require("../models");
const { username, email, thoughts } = require("./data");

connection.on("error", (err) => err);
connection.once("open", async () => {
  console.log('CONNECTED')

  await User.deleteMany({});
  await Thought.deleteMany({});

  // seeding users
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
  console.log("USERS SEEDED");

  // seeding thoughts 
  const thought = [];

  function thoughtData() {
    for (var i = 0; i < thoughts.length; i++) {
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
