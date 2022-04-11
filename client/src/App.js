import './App.css';
import { useState, useEffect } from 'react'
import Axios from 'axios'

function App() {
  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")
  useEffect(() => {
    Axios.get("http://localhost:5000/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, [])

  const createUser = () => {
    Axios.post("http://localhost:5000/createUser", { name, age, username }).then((response) => {
      setListOfUsers([...listOfUsers, { name, age, username }])
    })
  }
  return (
    <div className="App">
      <div className="usersDisplay">
        {
          listOfUsers.map((user) => {
            return (
              <div>
                <h3>Name : {user.name}</h3>
                <h3>age : {user.age}</h3>
                <h3>username : {user.username}</h3>
                <hr />
              </div>
            )
          })
        }
      </div>
      <div>
        <input type="text" placeholder="Name.." onChange={(event) => setName(event.target.value)} />
        <input type="number" placeholder="age.." onChange={(event) => setAge(event.target.value)} />
        <input type="text" placeholder="username.." onChange={(event) => setUsername(event.target.value)} />
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
