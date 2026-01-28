# 1. Server Index.js

## Create Users Array []

- 1. Create Users Data

## GET User Route

- 2. Get All Users

# 2. Client App.jsx

- 3. Fetching Data from Server

# 4. Sent from App.jsx to Users.jsx [component]

```js
<Users usersPromise={usersPromise} />
```

# 5. Receive on Users.jsx [component]

```js
import { use } from 'react';
const Users = ({ usersPromise }) => {
  const users = use(usersPromise);
  console.log(users);
  return <div>Users</div>;
};
```

# 6. Initial CORS Middleware in index.js

- CORS ছাড়া client এ server থেকে পাঠানো কোনো Data দেখায় না

```js
app.use(cors());
```

# 7. Show Data in Client

```js
{
  users.map((user, id) => (
    <p key={id}>
      {user.name} : {user.email}
    </p>
  ));
}
```

# 8. Add Data Request from Client to Server

```js
<div>
  <form action=''>
    <input
      type='text'
      name='name'
      placeholder='Name'
    />
    <br />
    <input
      type='email'
      name='email'
      placeholder='Email'
    />
    <br />
    <input
      type='number'
      name='age'
      placeholder='Age'
    />
    <br />
    <button type='submit'>Add User</button>
  </form>
</div>
```

# 9. Handle Add User Request from Client

```js
const handleAddUser = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const age = e.target.age.value;
  const user = { name, email, age };
};
```

# 10. Submit Form from Client

```js
 <form onSubmit={handleAddUser}>
```

# 11. Send Add User Request from Client to Server

```js
fetch('http://localhost:3000/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

# 11. Body Middleware

```js
app.use(express.json());
```

# 12. Create [POST] API in Server

```js
app.post('/users', (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  res.send(newUser);
});
```

# 13. Show New Users State

```js
const [users, setUsers] = useState(initialUsers);
```

# 14. Set New Users

```js
const newUsers = [...users, data];
setUsers(newUsers);
e.target.reset();
```

- Final Handler

```js
const Users = ({ usersPromise }) => {
  const initialUsers = use(usersPromise);
  const [users, setUsers] = useState(initialUsers);
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const age = e.target.age.value;
    const user = { name, email, age };
    console.log(user);

    /** 11. Send Add User Request from Client to Server */
    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        /** 14. Set New Users */
        const newUsers = [...users, data];
        setUsers(newUsers);
        e.target.reset();
      });
  };
};
```

# 15. MongoDB Connection

- 1 config/db.js

```js
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDB() {
  await client.connect();
  console.log('MongoDB connected');
  return client;
}

module.exports = connectDB;
```

- 2 index.js

```js
async function run() {
  try {
    client = await connectDB();

    /** Specific New DB in MongoDB */
    const myDB = client.db('studentsDB');

    /** Specific New Collection in MongoDB */
    const myCollection = myDB.collection('students');

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);
```

# 16. Create Students API in Server Side

```js
app.post('/students', async (req, res) => {
  try {
    /** Receive Data From Client Side */
    const newStudent = req.body;
    console.log('After Post Students', newStudent);

    /** Store Data in MongoDB */
    const result = await myCollection.insertOne(newStudent);
    res.send(result);
  } catch (err) {
    console.error('Insert student error:', err);
    res.status(500).send({ error: 'Failed to insert student' });
  }
});
```

# 17. Create Student in the DB from Client Side

```js
const handleAddStudent = (e) => {
  e.preventDefault();
  const name = e.target.name.value;
  const email = e.target.email.value;
  const newStudent = { name, email };
  console.log(newStudent);

  /** 17. Create Student in the DB */
  fetch('http://localhost:3000/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newStudent),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Data After Creating New Student in DB', data);
      if (data.insertedId) {
        alert('Student Added Successfully');
        e.target.reset();
      }
    });
};

<form onSubmit={handleAddStudent}>
  <input
    type='text'
    name='name'
    placeholder='Name'
  />
  <br />
  <input
    type='email'
    name='email'
    placeholder='Email'
  />
  <br />

  <br />
  <input
    type='submit'
    value='Add Student'
  />
</form>;
```

## 18 Another Way Very Best Way

- 18.1 Create Student.Controller.js

```js
let studentsCollection; // 🗂 1. Will be initialized from index.js

// 🔧 2. Set collection reference for controller
function setCollection(myCollection) {
  studentsCollection = myCollection;
}

// 📝 3. Create Student Controller
async function createStudentController(req, res) {
  try {
    /** ✉️ Receive Data From Client Side */
    const newStudent = req.body;
    console.log('📬 After Post Students:', newStudent);

    /** 💾 3.2 Insert Data into MongoDB */
    const result = await studentsCollection.insertOne(newStudent);

    // ✅ 3.3 Send response back to client
    res.send(result);
  } catch (err) {
    console.error('❌ Insert student error:', err);
    res.status(500).send({ error: 'Failed to insert student' });
  }
}

module.exports = {
  createStudentController,
  setCollection,
};
```

- 18.2 Create Student.Routes.js

```js
const express = require('express');
const {
  createStudentController,
} = require('../Controllers/Students.Controller.js');
const studentsRoutes = express.Router();

// 🚀 1. POST /students route
studentsRoutes.post('/students', createStudentController);

module.exports = studentsRoutes;
```

- 18.2 index.js

```js
async function run() {
  try {
    client = await connectDB();

    /** 🗄  Specific New DB in MongoDB */
    const myDB = client.db('studentsDB');

    /** 🗂 Specific New Collection in MongoDB */
    const myCollection = myDB.collection('students');

    // 🎯 3.3 Inject collection into controller
    setCollection(myCollection);

    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (err) {
    console.error(err);
  }
}

run().catch(console.dir);

/** 🛣  16. Create Students API in Server Side */
app.use('/', studentsRoutes);
```

# 19. Get All Students Data From MongoDB

- 19.1 Crate Controller

```js
async function getAllStudentsController(req, res) {
  try {
    const cursor = studentsCollection.find({});
    const students = await cursor.toArray();
    res.send(students);
  } catch (err) {
    console.error('❌ Get all students error:', err);
    res.status(500).send({ error: 'Failed to retrieve students' });
  }
}
```

- 19.2 Routes

```js
studentsRoutes.get('/students', getAllStudentsController);
```

- 19.3 Fetch Data In Client Side [Parent]

```js
const studentsPromise = fetch('http://localhost:3000/students').then((res) =>
  res.json(),
);
```

- 19.4 Send From App.jsx[parent] to Students.jsx[Child]

```js
<Students studentsPromise={studentsPromise} />
```

- 19.5 Receive Data in Students.jsx[Child]

```js
const Students = ({ studentsPromise }) => {};
```

- 19.6 Initial Data with [react-use] API

```js
const initialStudents = use(studentsPromise);
console.log(initialStudents);
```

- 19.7 Store Initial Data & New Data in State Students.jsx[child]

```js
const [students, setStudents] = useState(initialStudents);
```

- 19.8 Finally Showing Data with Mapping in Students.jsx[child]

```js
<div>
  <h2>Students List</h2>
  {/* Show Students Data in Client */}
  {students.map((student, id) => (
    <p key={id}>
      {student.name} - {student.email}
    </p>
  ))}
</div>
```

# 20. Delete Student

- 20.1 Create Delete Controller in Server Side

```js
async function deleteStudentController(req, res) {
  try {
    const studentId = req.params.id;
    console.log(studentId);
    const query = { _id: new ObjectId(studentId) };
    const result = await studentsCollection.deleteOne(query);
    res.send(result);
  } catch (err) {
    console.error('❌ Delete student error:', err);
    res.status(500).send({ error: 'Failed to delete student' });
  }
}
```

- 20.2 Create Delete Route in Server Side

```js
studentsRoutes.delete('/students/:id', deleteStudentController);
```

- 20.3 Create Delete Handler in Client Side

```js
const handleDeleteStudent = (id) => {
  fetch(`http://localhost:3000/students/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      console.log('Data After Deleting Student in DB', id, data);
      if (data.deletedCount > 0) {
        const updatedStudents = students.filter(
          (student) => student._id !== id,
        );
        setStudents(updatedStudents);
        alert('Student Deleted Successfully');
      }
    });
};
```

- 20.4 Create Submit with id in Client Side

```js
<button onClick={() => handleDeleteStudent(student._id)}>X</button>
```

# 21 Specific Data With id

- 21.1 Create Controller

```js
async function getStudentByIdController(req, res) {
  try {
    const studentId = req.params.id;
    const query = { _id: new ObjectId(studentId) };
    const result = await studentsCollection.findOne(query);
    res.send(result);
  } catch (err) {
    console.error('❌ Get student by ID error:', err);
    res.status(500).send({ error: 'Failed to retrieve student' });
  }
}
```

- 21.2 Define a Route

```js
studentsRoutes.get('/students/:id', getStudentByIdController);
```

- 21.3 Create Component in [Client] Side
- 21.4 Define Dynamic Route in [Client] Side

```js
{
  path: '/student/:id',
  Component: StudentDetails,
  loader: async ({ params }) => {
    const res = await fetch(
      `http://localhost:3000/students/${params.id}`,
    );
    const data = await res.json();
    return data;
  },
},
```

- 21.5 Link in Student.jsx to StudentDetails.jsx

```js
<Link to={`/students/${student._id}`}>Details</Link>
```

- 21.6 Receive Loader Data from Dynamic Route

```js
const student = useLoaderData();
console.log('Student Details Loader Data:', student);
```

# 22

- 21.1 Create Controller

```js
<button onClick={() => handleDeleteStudent(student._id)}>X</button>
```
