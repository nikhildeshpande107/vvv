const API = "http://localhost:3000/users";

function fetchUsers() {
    axios.get(API)
    .then(res => {
        const users = res.data;
        const table = document.getElementById("userTable");
        table.innerHTML = "";

        users.forEach(user => {
            table.innerHTML += `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="deleteUser('${user._id}')">Delete</button>
                    </td>
                </tr>
            `;
        });
    })
    .catch(err => console.error(err));
}

fetchUsers();


document.getElementById("userForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    axios.post(API, { name, email })
    .then(() => {
        fetchUsers();
    })
    .catch(err => console.error(err));
});

function deleteUser(id) {
    axios.delete(`${API}/${id}`)
    .then(() => {
        fetchUsers();
    })
    .catch(err => console.error(err));
}


function editUser(id, oldName) {
    const newName = prompt("Enter new name:", oldName);

    if (newName) {
        axios.put(`${API}/${id}`, { name: newName })
        .then(() => fetchUsers())
        .catch(err => console.error(err));
    }
}

//login

function login() {
    axios.post("http://localhost:3000/login", {
        email: "test@test.com",
        password: "123456"
    })
    .then(res => {
        localStorage.setItem("token", res.data.token);
        alert("Login Successful");
    })
    .catch(err => console.error(err));
}


axios.get("http://localhost:3000/profile", {
    headers: {
        Authorization: `Bearer ${token}`
    }
})
.then(res => console.log(res.data));

function logout() {
    localStorage.removeItem("token");
}
const API = "http://localhost:3000/users";