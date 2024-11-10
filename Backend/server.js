const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // replace with your DB user
    password: 'kushal2908',    // replace with your DB password
    database: 'dbms_project' // replace with your DB name
});

db.connect(err => {
    if (err) {
    console.error('Database connection error:', err);
    } else {
    console.log('Connected to the database');
    }
});

// Sample route structure for handling CRUD on the Unit table
app.get('/api/unit', (req, res) => {
    db.query('SELECT * FROM Unit', (err, results) => {
    if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/unit', (req, res) => {
    const { Unit_Name, Unit_Type, Base_Location } = req.body;
    db.query('INSERT INTO Unit (Unit_Name, Unit_Type, Base_Location) VALUES (?, ?, ?)', 
            [Unit_Name, Unit_Type, Base_Location], 
            (err, result) => {
        if (err) return res.status(500).send(err);
            res.json(result);
    });
});

app.delete('/api/unit/:id', (req, res) => {
    db.query('DELETE FROM Unit WHERE Unit_ID = ?', [req.params.id], (err, result) => {
        if (err) return res.status(500).send(err);
            res.json(result);
    });
});

app.put('/api/unit/:id', (req, res) => {
    const { Unit_Name, Unit_Type, Base_Location } = req.body;
    db.query(
        'UPDATE Unit SET Unit_Name = ?, Unit_Type = ?, Base_Location = ? WHERE Unit_ID = ?',
        [Unit_Name, Unit_Type, Base_Location, req.params.id],
        (err, result) => {
            if (err) return res.status(500).send(err);
                res.json(result);
        }
    );
});

// Repeat similar routes for each table (Vehicle, Equipment, etc.)
// Example for Personnel table:
// GET all personnel
app.get('/api/personnel', (req, res) => {
    db.query('SELECT * FROM Personnel', (err, results) => {
        if (err) {
            console.error('Error fetching personnel:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// POST new personnel
app.post('/api/personnel', (req, res) => {
    const { Name, Rank_Title, Years_of_Service, Date_Of_Birth } = req.body;

    const query = 'INSERT INTO Personnel (Name, Rank_Title, Years_of_Service, Date_Of_Birth) VALUES (?, ?, ?, ?)';
    
    db.query(query, [Name, Rank_Title, Years_of_Service, Date_Of_Birth], (err, result) => {
        if (err) {
            console.error('Error adding personnel:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Fetch and return the newly added record
        db.query('SELECT * FROM Personnel WHERE Personnel_ID = ?', [result.insertId], (err, newRecord) => {
            if (err) {
                console.error('Error fetching newly added personnel:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(newRecord[0]); // Send back the new personnel data
        });
    });
});

// DELETE personnel by ID
app.delete('/api/personnel/:id', (req, res) => {
    db.query('DELETE FROM Personnel WHERE Personnel_ID = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting personnel:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Personnel deleted successfully' });
    });
});

// PUT (Update) personnel details (for future use if needed)
app.put('/api/personnel/:id', (req, res) => {
    const { Name, Rank_Title, Years_of_Service, Date_Of_Birth } = req.body;

    const query = 'UPDATE Personnel SET Name = ?, Rank_Title = ?, Years_of_Service = ?, Date_Of_Birth = ? WHERE Personnel_ID = ?';
    db.query(query, [Name, Rank_Title, Years_of_Service, Date_Of_Birth, req.params.id], (err, result) => {
        if (err) {
            console.error('Error updating personnel:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Personnel updated successfully' });
    });
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});
