const user_id = localStorage.getItem("user_id");
document.getElementById('nav-username').innerText = `${localStorage.getItem('username')}`;

function startSession(quizz_id) {
  window.location.href = `/start-my-quizz?quizz_id=${quizz_id}`;
};

const requestOptions = {
  method: "GET",
  redirect: "follow",
};

fetch(`http://127.0.0.1:5000/quizz?user_id=${user_id}`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    const allQuizz = result.quizz;


    function trunkText(text) {
      if (text.length > 40) {
        return text.substring(0, 40) + "...";
      }
      return text;
    }

    for (let i = 0; i < allQuizz.length; i++) {
      const quizzTemplate = `
        <!-- Exemple de quiz -->
        <div class="bg-[#DBE2EF] p-6 rounded-lg mb-6 shadow-md fade-in">
            <div class="flex items-center justify-between mb-4">
                <h2 class="text-xl font-semibold text-[#112D4E]">${trunkText(allQuizz[i].name)}</h2>
                <span class="text-[#3F72AF]">${allQuizz[i].questions.length} Questions</span>
            </div>
            <div class="flex space-x-4">
                <button onclick="editQuizz(${allQuizz[i].quizz_id})" class="bg-[#3F72AF] text-white px-4 py-2 rounded hover:bg-[#112D4E] flex items-center">
                    <!-- Icone Modifier -->
                    <i class="fa-solid fa-pen mr-2"></i>
                    Modifier
                </button>
                <button onclick="deleteQuizz(${allQuizz[i].quizz_id})" class="bg-[#3F72AF] text-white px-4 py-2 rounded hover:bg-[#112D4E] flex items-center">
                    <!-- Icone Supprimer -->
                    <i class="fa-solid fa-trash mr-2"></i>
                    Supprimer
                </button>
                <button onclick="startSession(${allQuizz[i].quizz_id})" class="bg-[#3F72AF] text-white px-4 py-2 rounded hover:bg-[#112D4E] flex items-center">
                    <!-- Icone Lancer -->
                    <i class="fa-solid fa-play mr-2"></i>
                    Lancer
                </button>
            </div>
        </div>


      `;

      const quizzContainer = document.getElementById("quizz-container");
      quizzContainer.insertAdjacentHTML("beforeend", quizzTemplate);

    }

  })
  .catch((error) => console.error(error));


