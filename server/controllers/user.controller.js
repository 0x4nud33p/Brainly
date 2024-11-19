import Content from "../models/content.model.js";

const addContent = async (req, res) => {
  const { link, title, tags, userId } = req.body;

  if (!link || !title || !userId) {
    return res.status(400).send({
      message: "Link, Title, and UserId are required fields",
    });
  }

  try {
    const newContent = await Content.create({ link, title, tags, userId });
    return res.status(201).send({
      message: "Content added successfully",
      content: newContent,
    });
  } catch (error) {
    console.error("Error While Adding Content", error);
    return res
      .status(500)
      .send({ message: "Error While Adding Content", error: error.message });
  }
};


const getContentDetails = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .send({ message: "Please provide the ID in the params" });
  }

  try {
    const content = await Content.findById(id);

    if (!content) {
      return res
        .status(404)
        .send({ message: "There is no content with the given ID" });
    }

    return res.status(200).send(content);
  } catch (error) {
    console.error("Error while fetching content", error);
    return res
      .status(500)
      .send({ message: "Internal Server Error", error: error.message });
  }
};


export { addContent, getContentDetails };
