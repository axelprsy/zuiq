async function get_ip() {
    const response = await fetch('/get_ip');
    const data = await response.json();
    return data["ip"];
}
get_ip().then((ip) => {
    url = ip;
})

function deleteQuizz(id) {
    const formdata = new FormData();
    formdata.append("quizz_id", id);

    const requestOptions = {
        method: "DELETE",
        body: formdata,
        redirect: "follow"
    };

    fetch(`http://${url}:5000/quizz`, requestOptions)
        .then((response) => response.text())
        .then((result) => {
            location.reload()
        })
        .catch((error) => console.error(error));
}
