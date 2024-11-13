const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const port = 9800;

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
// GET all units
app.get('/api/unit', (req, res) => {
    db.query('SELECT * FROM Unit', (err, results) => {
        if (err) {
            console.error('Error fetching units:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// POST new unit
app.post('/api/unit', (req, res) => {
    const { Unit_Name, Unit_Type, Base_Location } = req.body;
    const query = 'INSERT INTO Unit (Unit_Name, Unit_Type, Base_Location) VALUES (?, ?, ?)';
    
    db.query(query, [Unit_Name, Unit_Type, Base_Location], (err, result) => {
        if (err) {
            console.error('Error adding unit:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Fetch and return the newly added unit
        db.query('SELECT * FROM Unit WHERE Unit_ID = ?', [result.insertId], (err, newRecord) => {
            if (err) {
                console.error('Error fetching newly added unit:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(newRecord[0]); // Send back the new unit data
        });
    });
});

// DELETE unit by ID
app.delete('/api/unit/:id', (req, res) => {
    db.query('DELETE FROM Unit WHERE Unit_ID = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting unit:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Unit deleted successfully' });
    });
});

// PUT (Update) unit details
app.put('/api/unit/:id', (req, res) => {
    const { Unit_Name, Unit_Type, Base_Location } = req.body;
    const unitId = req.params.id;

    const query = 'UPDATE Unit SET Unit_Name = ?, Unit_Type = ?, Base_Location = ? WHERE Unit_ID = ?';
    db.query(query, [Unit_Name, Unit_Type, Base_Location, unitId], (err, result) => {
        if (err) {
            console.error('Error updating unit:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Unit not found' });
        }

        res.json({ message: 'Unit updated successfully' });
    });
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

// PUT (Update) personnel details by ID
app.put('/api/personnel/:id', (req, res) => {
    const { Name, Rank_Title, Years_of_Service, Date_Of_Birth } = req.body;
    const personnelId = req.params.id;

    const query = 'UPDATE Personnel SET Name = ?, Rank_Title = ?, Years_of_Service = ?, Date_Of_Birth = ? WHERE Personnel_ID = ?';
    db.query(query, [Name, Rank_Title, Years_of_Service, Date_Of_Birth, personnelId], (err, result) => {
        if (err) {
            console.error('Error updating personnel:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Personnel not found' });
        }

        res.json({ message: 'Personnel updated successfully' });
    });
});


// GET all operations
app.get('/api/operation', (req, res) => {
    db.query('SELECT * FROM Operation', (err, results) => {
        if (err) {
            console.error('Error fetching operations:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(results);
    });
});

// POST new operation
app.post('/api/operation', (req, res) => {
    const { Operation_Name, Start_Date, End_Date } = req.body;

    const query = 'INSERT INTO Operation (Operation_Name, Start_Date, End_Date) VALUES (?, ?, ?)';
    
    db.query(query, [Operation_Name, Start_Date, End_Date], (err, result) => {
        if (err) {
            console.error('Error adding operation:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        // Fetch and return the newly added record
        db.query('SELECT * FROM Operation WHERE Operation_ID = ?', [result.insertId], (err, newRecord) => {
            if (err) {
                console.error('Error fetching newly added operation:', err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json(newRecord[0]); // Send back the new operation data
        });
    });
});

// DELETE operation by ID
app.delete('/api/operation/:id', (req, res) => {
    db.query('DELETE FROM Operation WHERE Operation_ID = ?', [req.params.id], (err, result) => {
        if (err) {
            console.error('Error deleting operation:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json({ message: 'Operation deleted successfully' });
    });
});

// PUT (Update) operation details
app.put('/api/operation/:id', (req, res) => {
    const { Operation_Name, Start_Date, End_Date } = req.body;
    const operationId = req.params.id;

    const query = 'UPDATE Operation SET Operation_Name = ?, Start_Date = ?, End_Date = ? WHERE Operation_ID = ?';
    db.query(query, [Operation_Name, Start_Date, End_Date, operationId], (err, result) => {
        if (err) {
            console.error('Error updating operation:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Operation not found' });
        }

        res.json({ message: 'Operation updated successfully' });
    });
});



// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
