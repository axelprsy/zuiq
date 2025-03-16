async function get_ip() {
  const response = await fetch('/get_ip');
  const data = await response.json();
  return data["ip"];
}


const user_id = localStorage.getItem("user_id");

function startSession(quizz_id) {
  window.location.href = `/start-my-quizz?quizz_id=${quizz_id}`;
};

const requestOptions = {
  method: "GET",
  redirect: "follow",
};
window.onload = async function() {
  await get_ip().then((ip) => {
    url = ip;
  })
  fetch(`http://${url}:5000/quizz?user_id=${user_id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    const allQuizz = result.quizz;

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
          <button onclick="startSession(${allQuizz[i].quizz_id})" class="button">Commencer le quizz</button>
          <button onclick="editQuizz(${allQuizz[i].quizz_id})" class="button">Modifier le quizz</button>
          <button onclick="deleteQuizz(${allQuizz[i].quizz_id})" class="button">Supprimer le quizz</button>
        </div>
      `;

      const quizzContainer = document.getElementById("quizz-container");
      quizzContainer.insertAdjacentHTML("beforeend", quizzTemplate);
      
    }

  })
  .catch((error) => console.error(error));
};



