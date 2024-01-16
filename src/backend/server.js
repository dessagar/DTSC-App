const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const OpenAI = require('openai');
const cors = require('cors')
const mongoose = require('mongoose');

const app = express();
const port=3000;

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));


const openai = new OpenAI({ apiKey: "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"});

app.post('/ask-openai', async (req, res) => {
  const { userQuery } = req.body;

  try {
    // Make a request to OpenAI API
    const openaiResponse = await openai.completions.create({
      model: "text-davinci-003",
      prompt: userQuery,
      max_tokens: 100,
    });

    const answer = openaiResponse.choices[0].text;
    res.json({ answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use(express.static('public')); 

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
 
//************************new code for database************************

// MongoDB connection
mongoose.connect('mongodb+srv://trainingapp111:VCot0hMvKkDwjDnv@cluster0.z8saabe.mongodb.net/?retryWrites=true&w=majority');

// Define question schema
const questionSchema = new mongoose.Schema({
  text: String,
  userName: String,
  timestamp: { type: Date, default: Date.now },
  answered: { type: Boolean, default: false },
  answer: String, // Add a field to store the answer
});

const Question = mongoose.model('Question', questionSchema);

app.use(bodyParser.json());

// Get all questions
app.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new question
app.post('/questions', async (req, res) => {
  const question = new Question({
    text: req.body.text,
    userName: 'User', // Update with user information if available
  });

  try {
    const newQuestion = await question.save();
    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/questions/:id/reply', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.answer = req.body.answer;
    question.answered = true;

    await question.save();

    res.status(200).json({ message: 'Answer added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add this to your server.js or relevant file
const slideSchema = new mongoose.Schema({
  title: String,
  subtitle: String,
  performer: String,
  image: String,
  externalVideos: [
    {
      videoTitle: String,
      videoDescription: String,
      youtubeUrl: String,
    },
  ],
  internalVideos: [
    {
      videoTitle: String,
      videoDescription: String,
      localVideoFile: String,
    },
  ],
  selectedModules: [String],
  timestamp: { type: Date, default: Date.now },
});

const SlideModel = mongoose.model('Slide', slideSchema);
// ...

app.post('/slides', async (req, res) => {
  const slideData = req.body;

  try {
    const newSlide = await SlideModel.create(slideData);
    res.status(201).json(newSlide);
  } catch (error) {
    console.error('Error adding slide:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
