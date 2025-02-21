document.getElementById('modal_user_id').value = `${localStorage.getItem('user_id')}`;
document.getElementById('modal_username').value = `${localStorage.getItem('username')}`;
document.getElementById('modal_email').value = `${localStorage.getItem('email')}`;

document.getElementById("form_modifyacount").addEventListener("submit", function (e) {
    e.preventDefault();

    const user_id = localStorage.getItem('user_id');
    const username = document.getElementById("modal_username").value;
    const email = document.getElementById("modal_email").value;

    const formdata = new FormData();
    formdata.append("user_id", user_id);
    formdata.append("username", username);
    formdata.append("email", email);

    const requestOptions = {
    method: "PATCH",
    body: formdata,
    redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/user", requestOptions)
    .then((response) => response.text() )
    .then((result) => {
        console.log(result)
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
    })
    .catch((error) => {
        console.error(error)
        document.getElementById("error_message").innerText = "Une erreur est survenue";
    })
});