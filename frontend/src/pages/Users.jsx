import { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
    }, []);

    async function getUsers() {
        const response = await fetch('http://localhost:22000/users');
        const data = await response.json();
        setUsers(data);
    }
    return (
        <div>
            <h2>Data Users</h2> {
                users.map((user) => (
                    <div key={user.id_user}>
                        <h3>{user.nama}</h3>
                        <p>{user.email}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default Users;
