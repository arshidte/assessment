import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Arshid',
        email: 'arshid@gmail.com',
        password: bcrypt.hashSync('arshid123', 10)
    },
    {
        name: 'Arshidte',
        email: 'arshidte@gmail.com',
        password: bcrypt.hashSync('arshidte123', 10)
    },
]

export default users;