require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://" +
  process.env.dbuser +
  ":" +
  process.env.dbpw +
  "@cluster0.1wmqh.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const createPost = async (req, res, next) => {
  const newPost = {
    url: req.body.name,
  };
  try {
    const database = client.db("music_blog_content");
    const postsCollection = database.collection("posts");

    const result = await postsCollection.insertOne(newPost);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    return res.json({
      message: "Could not store data.",
    });
  } finally {
    await client.close();
    res.json(newPost);
  }
};
const getPost = async (req, res, next) => {};

exports.createPost = createPost;
exports.getPost = getPost;
