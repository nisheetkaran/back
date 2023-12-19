const {c} = require('../database');

const user = `CREATE TABLE users (
    name VARCHAR(255), 
    age INT, 
    email VARCHAR(255) PRIMARY KEY,
    batch VARCHAR(255) );`

const payment = `CREATE TABLE payments(paymentId INT PRIMARY KEY AUTO_INCREMENT,     
    email VARCHAR(255),     
    month VARCHAR(255),     
    amountPaid INT, FOREIGN KEY (email) REFERENCES users(email) );`
const queryAsync = (sql, values) => {
    return new Promise((resolve, reject) => {

        
    
        c.query(sql, values, (err, results) => {
            if (err){
                console.log(err.message)
                reject(err);
            } 
            resolve(results);
        });
    });
};

async function checkAndCreateUser(name, age, email, batch) {
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';

    const userResults = await queryAsync(checkUserQuery, [email]);


    if (userResults.length === 0) {
        const createUserQuery =
            'INSERT INTO users (name, age, email, batch) VALUES (?, ?, ?, ?)';
        await queryAsync(createUserQuery, [name, age, email, batch]);
    }
};

async function checkIfAlreadyPaid(month, email) {
    const checkUserQuery = 'SELECT * FROM payments WHERE email = ? AND month = ?';
    const userResults = await queryAsync(checkUserQuery, [email, month]);
    if (userResults.length) return true;
    return false;
}

async function processPayment(req) {
    const { name, selectedMonth, batch, paymentInfo, age, email } = req.body;
    console.log(batch)
    
    await checkAndCreateUser(name, age, email, batch);
    console.log("yha tk bhi aa gye bc")
    const isalreadyPaid = await checkIfAlreadyPaid(selectedMonth, email);
    if(isalreadyPaid) return "payment is already done!";
    const paymentQuery = 'INSERT INTO payments (email, month, amountPaid) VALUES (?, ?, ?)';
    await queryAsync(paymentQuery, [email, selectedMonth, paymentInfo]);
    return "payment done!";
}

module.exports = processPayment;