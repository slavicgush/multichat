import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "yours",
  user: "yours",
  password: "yours",
  database: "yours",
});
try {
  await db.connect();
  console.log("Connected to MYSQL chat room database");
} catch (err) {
  console.error("Database connection error:", err);
}

export async function getUser(query = {}) {
  const queryElements = [];
  const values = [];
  if (query) {
    for (const key in query) {
      queryElements.push(`${key} = ?`);
      values.push(query[key]);
    }
  }

  const queryString = `SELECT * FROM users WHERE ${queryElements.join(
    " AND "
  )}`;
  //console.log('Generated SQL query:', queryString);
  //console.log('Query values:', values);
  try {
    const [data] = await db.query(queryString, values);
    // console.log(data);
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export async function createUser(query = {}) {
  const queryElements = [];
  const values = [];
  if (query) {
    for (const key in query) {
      queryElements.push(`${key} = ?`);
      values.push(query[key]);
    }
  }

  const queryString = `INSERT INTO users (username,password) VALUES(?,?)`;
  // console.log('Generated SQL query:', queryString);
  // console.log('Query values:', values);
  try {
    const [data] = await db.query(queryString, values);
    return data.insertId;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export async function storeMsgs(query = {}) {
  const queryElements = [];
  const values = [];
  if (query) {
    for (const key in query) {
      queryElements.push(`${key} = ?`);
      values.push(query[key]);
    }
  }

  const queryString = `INSERT INTO messages (type,name,msg) VALUES(?,?,?)`;
  // console.log('Generated SQL query:', queryString);
  // console.log('Query values:', values);
  try {
    const [data] = await db.query(queryString, values);
    console.log(data.insertId);
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}

export async function get30Msgs(){
  const query = `SELECT type,name,msg FROM messages WHERE id >= (SELECT MAX(id) - 20 FROM messages) ORDER BY id ASC`;
  try {
    const [data] = await db.query(query);
    return data;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }
}
