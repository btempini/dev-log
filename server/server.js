//server
const express = require("express");
const routes = require("./routes");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const { authMiddleware } = require("./utils/auth");
const dotenv = require("dotenv");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");
const { nextTick } = require("process");
// const aws = require("./utils/aws");

dotenv.config();
const PORT = process.env.PORT || 3001;
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

//check new day
const checkNewDay = function (req, res, next) {
  let newDate = new Date();
  newDate = newDate.getDate();
  if (newDate !== lastDate || lastDate === "") {
    lastDate = newDate;
    console.log("its a new day!!!");
  }
  next();
};
//check if its a new month
const newMonth = function (req, res, next) {
  let newDate = new Date();
  newDate = newDate.getDate();
  if (newDate === 28 || lastDate === "") {
    console.log("get new ids");
  }
  next();
};

let lastDate = "";
app.use(newMonth);
app.use(checkNewDay);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

startApolloServer(typeDefs, resolvers);
