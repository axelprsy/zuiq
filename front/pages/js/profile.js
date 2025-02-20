document.getElementById('id').innerText = `ID : ${localStorage.getItem('user_id')}`;
document.getElementById('username').innerText = `Nom d'utilisateur : ${localStorage.getItem('username')}`;
document.getElementById('email').innerText = `Email : ${localStorage.getItem('email')}`;

function logout() {
    localStorage.clear();
    window.location.href = '/';
    window.location.replace("../../auth/html/login.html");
}

async function delete_my_account() {
    const formdata = new FormData();
    formdata.append("user_id", localStorage.getItem('user_id'));

    const requestOptions = {
    method: "DELETE",
    body: formdata,
    redirect: "follow"
    };

    await fetch("http://127.0.0.1:5000/user", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));

    window.location.replace("../../auth/html/signup.html");
}