const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://abi12subramaniam:abi1208abi@aiesec.cuwp7.mongodb.net/?retryWrites=true&w=majority&appName=AIESEC')
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Define Schema
const OpportunitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: Number, default: 0 },
  accommodation: { type: String, required: true },
  transport: { type: String, required: true },
});

// Create Model
const Opportunity = mongoose.model('Opportunity', OpportunitySchema);

// Define Routes
app.get('/opportunities', async (req, res) => {
    try {
      console.log('Fetching opportunities from the database...');
      const opportunities = await Opportunity.find();  // Fetch data from MongoDB
      console.log('Fetched Opportunities:', opportunities); // Log the data to verify
      if (opportunities.length === 0) {
        console.log('No opportunities found in the database.');
      }
      res.json(opportunities);  // Return the data
    } catch (error) {
      console.error('Error fetching opportunities:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/opportunities', async (req, res) => {
    try {
      console.log('Received Opportunity Data:', req.body);
      const opportunity = new Opportunity(req.body);
      await opportunity.save();
      console.log('Opportunity Saved:', opportunity);  // Log saved data
      res.json(opportunity);  // Return saved document
    } catch (error) {
      console.error('Error saving opportunity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Start Server
app.listen(5000, () => console.log('Server running on port 5000'));
