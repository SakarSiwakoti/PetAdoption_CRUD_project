


// Import required modules
import express from "express";
import mysql from "mysql";
import cors from "cors";


// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'sakarsiwakoti',
  password: '@Sakar5530',
  database: 'PET_ADOPTION',
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err.stack);
    return;
  }
  console.log('Connected to MySQL database.');
});

// GET all pets
app.get("/pets", (req, res) => {
  const query = "SELECT * FROM pets";
  db.query(query, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

// GET a single pet by ID
app.get("/pets/:id", (req, res) => {
  const petId = req.params.id;
  const query = "SELECT * FROM pets WHERE id = ?";
  db.query(query, [petId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "Pet not found" });
    }
    return res.json(data[0]);
  });
});

// POST a new pet
app.post("/pets", (req, res) => {
  const { name, category, gender, age, image,description } = req.body;
 
  const query = "INSERT INTO pets (name, category, gender, age, image, description) VALUES (?, ?, ?, ?, ?,?)";
  const values = [name, category, gender, age, image, description];
  db.query(query, values, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

// DELETE a pet by ID
app.delete("/pets/:id", (req, res) => {
  const petId = req.params.id;
  const query = "DELETE FROM pets WHERE id = ?";
  db.query(query, [petId], (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
    return res.json(data);
  });
});

app.put("/pets/:id", (req, res) => {
  const petId = req.params.id;
  const { name, category, gender, age, image, description } = req.body;
  const query = "UPDATE pets SET name = ?, category = ?, gender = ?, age = ?, image = ?, description = ? WHERE id = ?";
  const values = [name, category, gender, age, image, description, petId];

  // Execute the query with the values array
  db.query(query, values, (error, results) => {
    if (error) {
      console.error("Error updating pet: ", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.status(200).json({ message: "Pet updated successfully" });
    }
  });
});




//Login/Signup ko backend --starts---->
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;
  
  // Check if username, email, and password are provided
  if (!username && !email && !password) {
      return res.status(400).json({ error: "Username, email, and password are required" });
  }

  
  if (!username) {
      return res.status(400).json({ error: "Username shouldn't be empty" });
  }
  
  if (!email) {
      return res.status(400).json({ error: "Email shouldn't be empty" });
  }
  
  if (!password) {
      return res.status(400).json({ error: "Password shouldn't be empty" });
  }
  

  const sql = "INSERT INTO users(`username`, `email` , `password`) VALUES(?, ?, ?)";
  const values = [
      req.body.username,
      req.body.email,
      req.body.password
  ]

  

  db.query(sql, values, (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error occurred while signing up" });
      }
      console.log("User signed up successfully");
      return res.status(200).json({ message: "User signed up successfully" });
  });
});
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  
  db.query(sql, [username, password], (err, result) => {
      if (err) {
          return res.status(500).json({ error: "Error occurred while logging in" });
      }
      if (result.length > 0) {
          console.log("User logged in successfully"); // Log success message
          return res.json("Login successful");
      } else {
          return res.json("Invalid username or password");
      }
  });
});


// Start the server
app.listen(8804, () => {
  console.log("Server is running on port 8804");
});
