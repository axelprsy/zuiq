const user_id = localStorage.getItem("user_id");

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(`http://127.0.0.1:5000/quizz?user_id=${user_id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    const allQuizz = result.quizz;
    console.log(allQuizz)

    for (let i = 0; i < allQuizz.length; i++) {
      const quizzTemplate = `
        <div class="quizz">
          <h2>${allQuizz[i].name}</h2>
          <p>Nombres de questions : ${allQuizz[i].questions.length}</p>
          <button onclick="startSession()" class="btn">Commencer le quizz</button>
          <button onclick="editQuizz(${allQuizz[i].quizz_id})" class="btn">Modifier le quizz</button>
          <button onclick="deleteQuizz(${allQuizz[i].quizz_id})" class"btn">Supprimer le quizz</button>
        </div>
      `;
      const quizzContainer = document.getElementById("quizz-container");
      quizzContainer.insertAdjacentHTML("beforeend", quizzTemplate);
    }

  })
  .catch((error) => console.error(error));


