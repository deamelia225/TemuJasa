import"../styles/Table.css";

function Users(){
    const users=[
        {
            id:1,
            nama:"Dea Amelia",
            email:"dea@gmail.com",
            role:"Customer"
        },
        {
            id:2,
            nama:"Andi",
            email:"andi@gmail.com",
            role:"Customer"
        }
    ];

    return(
        <div className="page">

            <h1>Data User</h1>

            <table className="table">

                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Role</th>
                </tr>
                </thead>

                <tbody>
                {users.map(item=>(
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nama}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                    </tr>
                ))}
                </tbody>

            </table>

        </div>
    );
}

export default Users;