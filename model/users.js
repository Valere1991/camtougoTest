import axios from 'axios';

const apiURL = "http://10.0.2.2:8082";

 export default Users = 
        // [axios.get(`${apiURL}/camtougo/users`)
        // .then( (response) => response.json())];
 [
    {
        id: 1, 
        email: 'user1@email.com',
        username: 'justine', 
        password: 'password1', 
        //userToken: 'token123'
    },
    {
        id: 2, 
        email: 'user2@email.com',
        username: 'test', 
        password: 'password', 
       // userToken: 'token12345'
    },
    {
        id: 3, 
        email: 'testuser@email.com',
        username: 'testuser', 
        password: 'testpass', 
       // userToken: 'testtoken'
    },
];