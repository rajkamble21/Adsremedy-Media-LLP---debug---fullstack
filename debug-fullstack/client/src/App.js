import React, { useState, useEffect } from 'react';
import NewUserForm from './Components/NewUserForm';
import EditUserForm from './Components/EditUserForm';
import {  useSnackbar } from 'notistack';


const App = () => {

  const initialFormState = {
    id: '',
    name: '',
    email: ''
  }

  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(initialFormState)
  const [editing, setEditing] = useState(false)
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    fetchUsers();
  }, [])

  const fetchUsers = async () => {
    const result = await fetch(`http://localhost:8080/users`)
    result
      .json()
      .then(result => setUsers(result))
      .catch(e => enqueueSnackbar('Error fetching users. Please try again.', { variant: 'error' }))
  }

  const handleInputChange = event => {
    const { id, value } = event.target
    setCurrentUser({ ...currentUser, [id]: value })
  }

  const submitNewUser = async (event) => {
    event.preventDefault();
    const {name, email} = currentUser;
    const response = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
    response
    .json()
    .then(result => {
      setUsers(prevUsers => [...prevUsers, result]); 
      setCurrentUser(initialFormState);
      enqueueSnackbar('User created successfully', { variant: 'success' });
    })
    .catch(e => enqueueSnackbar('Error fetching users. Please try again.', { variant: 'error' }));

  }

  const deleteUser = async (item) => {

    const response = await fetch(`http://localhost:8080/users/${item.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    response
      .json()
      .then(result => console.log(result), enqueueSnackbar('User deleted successfully', { variant: 'success' }), fetchUsers())
      .catch(e => enqueueSnackbar('Error deleting user. Please try again.', { variant: 'error' }));
  }

  const editUser = item => {
    setEditing(true)
    setCurrentUser({ id: item.id, name: item.name, email: item.email })
  }

  const submitUserEdit = async (event) => {
    event.preventDefault()


    const response = await fetch(`http://localhost:8080/users/${currentUser.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentUser),
    })
    response
      .json()
      .then(result => {
        setUsers(prevUsers => [...prevUsers, result]);
        fetchUsers();
        setCurrentUser(initialFormState);
        setEditing(false);
        enqueueSnackbar('User updated successfully', { variant: 'success' });
      })
      .catch(e => enqueueSnackbar('Error updating user. Please try again.', { variant: 'error' }));

  }

  return (
    <div className="container">
      <h1>Full Stack Assignment</h1>
      <h5>Basic CRUD Opreations</h5>

      <div className="flex-row">
        {editing ?
          <div className="flex-large">
            <EditUserForm
              submitUserEdit={submitUserEdit}
              handleInputChange={handleInputChange}
              currentUser={currentUser}
            />
          </div>
          :
          <div className="flex-large">
            <NewUserForm
              submitNewUser={submitNewUser}
              handleInputChange={handleInputChange}
              currentUser={currentUser}
            />
          </div>
        }

        <div className="flex-large">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(item =>
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button onClick={() => editUser(item)} className="muted-button" >Edit</button>
                    <button onClick={() => deleteUser(item)} style={{ marginLeft: 5 }} className="muted-button" >Delete</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
