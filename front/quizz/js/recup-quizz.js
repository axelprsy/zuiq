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

    function trunkText(text) {
      if (text.length > 25) {
        return text.substring(0, 25) + "...";
      }
      return text;
    }

    for (let i = 0; i < allQuizz.length; i++) {
      const quizzTemplate = `
        <div class="quizz">
          <h2 id="title_quizz">${trunkText(allQuizz[i].name)}</h2>
          <p>Nombres de questions : ${allQuizz[i].questions.length}</p>
          <button onclick="startSession()" class="button">Commencer le quizz</button>
          <button onclick="editQuizz(${allQuizz[i].quizz_id})" class="button">Modifier le quizz</button>
          <button onclick="deleteQuizz(${allQuizz[i].quizz_id})" class="button">Supprimer le quizz</button>
        </div>
      `;

      const quizzContainer = document.getElementById("quizz-container");
      quizzContainer.insertAdjacentHTML("beforeend", quizzTemplate);
      
    }

  })
  .catch((error) => console.error(error));


