const express = require("express");
const router = express.Router();
const ProjMo = require("../models/projects");

//Gets all posts
router.get("/", async (req, res) => {
  try {
    const projOB = await ProjMo.find();
    res.json(projOB);
  } catch (err) {
    res.json({ message: err });
  }
});

//Submits a post
router.post("/", async (req, res) => {
  const postProject = new ProjMo({
    name: req.body.name,
    lastname: req.body.lastname,
    IDnumber:req.body.IDnumber,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status
  });
  try {
    const savedProject = await postProject.save();
    res.json(savedProject);
  } catch (err) {
    res.json({ message: err });
  }
});
//Specific post
router.get("/:IDnumber", async (req, res) => {
  //console.log(req.params.postId);
  try {
    const projectSpe = await ProjMo.find({IDnumber:{'$regex':req.params.IDnumber}});
    res.json(projectSpe);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete post

router.delete("/:postId", async (req, res) => {
  try {
    const projDel = await ProjMo.remove({ _id: req.params.postId });
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;

//patch Post
router.patch('/:postId', async (req, res) => {
try {
    const upProject = await ProjMo.updateOne({_id: req.params.postId},
        {$set: {imageUrl: req.body.imageUrl}}
        );
        res.json(upProject);
} catch (error) {
    res.json({message: err});
}
});