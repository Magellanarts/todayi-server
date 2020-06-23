require('dotenv').config();
const router = require('express').Router();
const User = require('../model/User');
const Entry = require('../model/Entry');
const verify = require('./verifyToken');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  dest: './uploads',
});

// get entries for logged in user
router.get('/user-entries', verify, async (req, res) => {
  const entries = await Entry.find({ user: req.user.id });
  res.json({
    entries,
  });
});

// save a new entry
router.post('/save-entry', verify, upload.single('file'), async (req, res) => {
  const data = req.body;

  // need to add testing

  data.user = req.user.id;

  // get user document
  const user = await User.findOne({ _id: data.user });

  if (req.file) {
    let upload = await cloudinary.uploader.upload(req.file.path, {
      folder: 'todayi',
    });

    // TODO: check to make sure file uploaded

    // remove temp file
    fs.unlink(req.file.path, (err) => {
      if (err) throw err;
    });

    // add image url to data
    data.image = upload.secure_url;

    // Create new entry
    const entry = new Entry({
      text: data.text,
      user: data.user,
      image: data.image,
    });

    // Save new entry
    try {
      const savedEntry = await entry.save();

      // add entry to user
      user.entries.push(savedEntry._id);
      try {
        // save updated user
        await user.save();
        return res.send('success');
      } catch {
        return res.status(400).send(err);
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  return res.send(data);
});

module.exports = router;
