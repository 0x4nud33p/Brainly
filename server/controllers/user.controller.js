import Content from "../models/content.model.js";
import mongoose from "mongoose";
import { Types } from "mongoose";

const addCollection = async (req, res) => {
  const { link, title, tags, userId, content } = req.body;
  console.log(req.body);

  if (!link || !title || !userId || !content) {
    return res.status(400).json({
      message: "Link, Title, and UserId content are required fields",
    });
  }

  try {
    const objectIdUserId = new mongoose.Types.ObjectId(`${userId}`);
    const newContent = await Content.create({
      link,
      title,
      tags,
      userId: objectIdUserId,
      content,
    });
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

const getAllCollections = async (req, res) => {
  const { userId } = req.body;
  const objectIdUserId = new mongoose.Types.ObjectId(`${userId}`);

  if (!objectIdUserId) {
    return res.status(400).json({ message: "userId is required" });
  }

  try {
    const collections = await Content.find({
      userId: objectIdUserId,
    }).populate("tags", "title");

    if (collections.length === 0) {
      return res
        .status(404)
        .json({ message: "User does not have any collections" });
    }

    return res.status(200).json(collections);
  } catch (error) {
    console.error("Error while fetching collections", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};


const getContentById = async (req, res) => {
  const { id } = req.params;

  const objectIdUserId = new mongoose.Types.ObjectId(`${id}`);

  if (!objectIdUserId) {
    return res
      .status(400)
      .send({ message: "Please provide the ID in the params" });
  }

  try {
    const content = await Content.findById(objectIdUserId);

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

const deleteContentById = async (req, res) => {
  const { contentid } = req.body;

  try {
    const objectid = new mongoose.Types.ObjectId(`${contentid}`); 
    const contentToBeDeleted = await Content.deleteOne({ _id: objectid }); 

    if (contentToBeDeleted.deletedCount === 0) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.status(200).json({ message: "Collection deleted successfully" });
  } catch (error) {
    console.error("Error While Deleting:", error.message);
    return res.status(500).json({ message: "Error while deleting collection" });
  }
};

const updateCollection = async (req, res) => {
  const { id, title, content, link } = req.body;

  if (!id || !title || !content || !link) {
    return res
      .status(400) 
      .json({ message: "id, title, content, and link are required" });
  }

  try {
   
    const collectionToBeUpdated = await Content.findById(id);
    if (!collectionToBeUpdated) {
      return res
        .status(404)
        .json({ message: "Collection with the given ID not found" });
    }

    
    await Content.findByIdAndUpdate(
      id,
      { title, content, link }, 
      { new: true, runValidators: true } 
    );

    return res.status(200).json({ message: "Collection updated successfully" });
  } catch (error) {
    console.error("Internal Server Error:", error);
    return res.status(500).json({ message: "Error while updating collection" });
  }
};



export {
  addCollection,
  getContentById,
  getAllCollections,
  deleteContentById,
  updateCollection,
};