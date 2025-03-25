async function get_ip() {
  const response = await fetch('/get_ip');
  const data = await response.json();
  return data["ip"];
}
get_ip().then((ip) => {
  url = ip;
})

async function createQuizz(quizz) {
  const title = quizz.name
  const questions = JSON.stringify(quizz.questions)

  const formdata = new FormData();
  formdata.append("name", title);
  formdata.append("user_id", localStorage.getItem("user_id"));
  formdata.append("questions", questions);

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(`https://api.zuiq.tech/quizz`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result)
      window.location.replace("/my-quizz");
    })
    .catch((error) => {
      console.error(error)
      document.getElementById("error_message").innerText = "Erreur lors de la création du quizz";
    });
}

async function generateWithAi() {
  const requestOptions = {
    method: "GET",
    redirect: "follow"
  };
  const theme = document.getElementById("theme").value;
  const public = document.getElementById("public").value;
  const nbQuestions = document.getElementById("nbQuestions").value

  const loader = document.querySelector(".loader-container");
  loader.style.display = "flex";

  const button_generate = document.getElementById("generateButton");
  button_generate.disabled = true;
  button_generate.classList.add("bg-gray-500", "cursor-not-allowed", "opacity-50")
  button_generate.classList.remove("hover:bg-[#2c527a]");

  fetch(`https://api.zuiq.tech/generate_quizz?theme=${theme}&public=${public}&number_of_questions=${nbQuestions}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      createQuizz(result["quizz"]["quizz"])
    })
    .catch((error) => console.error(error));
}

function closeModalIA() {
  window.location.reload();
}

async function CreateFormToGenerateWithAi() {
  const form_newquizz = document.getElementById('modal');
  form_newquizz.innerHTML = "";

  const formHTML = `
    <div id="modalIA" class="bg-[#F9F7F7] rounded-lg p-8 w-full max-w-md relative flex flex-col space-y-4">
      <span onclick="closeModalIA()" class="absolute top-4 right-4 text-[#112D4E] text-2xl cursor-pointer close close-button">&times</span>
      <h2 class="text-[#112D4E] text-2xl font-bold mb-4">Génération d'un quiz</h2>
      <label class="text-[#112D4E] font-bold">Thème :</label>
      <input type="text" id="theme" class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
      <label class="text-[#112D4E] font-bold">Public :</label>
      <input type="text" id="public" class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
      <label class="text-[#112D4E] font-bold">Nombre de questions :</label>
      <input type="number" id="nbQuestions" class="border border-gray-300 rounded-md py-2 px-4 mt-1 focus:outline-none focus:ring-2 focus:ring-[#3F72AF]">
      <button onclick="generateWithAi()" id="generateButton" class="btn-create-quizz bg-[#3F72AF] text-white py-2 px-4 rounded-md hover:bg-[#2c527a] transition duration-300 mt-4">Générer</button>
      <div class="loader-container">
        <div class="loader">
          <div class="inner-circle"></div>
        </div>
      </div>
    </div>
  `;

  form_newquizz.innerHTML = formHTML;
}