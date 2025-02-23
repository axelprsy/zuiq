function deleteQuizz(id) {
    const formdata = new FormData();
    formdata.append("quizz_id", id);

    const requestOptions = {
        method: "DELETE",
        body: formdata,
        redirect: "follow"
    };

    fetch("http://127.0.0.1:5000/quizz", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            location.reload()
        })
        .catch((error) => console.error(error));
}
