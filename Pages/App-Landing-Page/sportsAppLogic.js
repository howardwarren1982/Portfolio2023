//For Sports App
const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

const searchButton = document.querySelector(".search-button");
let serchRequest = document.querySelector(".input-player input");
const playerContainer = document.querySelector(".sports-player-container");
const sportsImage = document.querySelector("#sportImg");

searchButton.addEventListener("click", function () {
  const player = getJSON(
    `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${serchRequest.value}`
  );
  sportsImage.style.visibility = "hidden";
  player.then((data) => {
    const renderHtml = function (data) {
      let getPlayerPic = function () {
        return data.strThumb;
      };
      let playerName = data.strPlayer;
      let dateBorn = data.dateBorn;
      let nation = data.strNationality;
      let gender = data.strGender;
      let height = data.strHeight;
      let weight = data.strWeight;
      let sport = data.strSport;
      let playerBio =
        data.strDescriptionEN &&
        data.strDescriptionEN.replaceAll("\\r\\n\\r\\n", " ");
      let wage = data.strWage;

      const html = `
    <dir class="player-card fade-in">
    <div class="container my-24 px-6 mx-auto">

    <!-- Section: Design Block -->
    <section class="mb-32 text-gray-800 text-center lg:text-left">
      <div class="block rounded-lg shadow-lg bg-white">
        <div class="flex flex-wrap items-center">
          <div class="block w-full lg:flex grow-0 shrink-0 basis-auto lg:w-6/12 xl:w-4/12">
            <img
              src=${getPlayerPic()}
              alt="Player Picture"
              class="w-full rounded-t-lg lg:rounded-tr-none lg:rounded-bl-lg"
            />
          </div>
          <div class="grow-0 shrink-0 basis-auto w-full lg:w-6/12 xl:w-8/12">
            <div class="px-6 py-12 md:px-12">
              <h2 class="text-3xl font-bold mb-4 text-blue-600 display-5">${playerName} (${gender})</h2>
              <p class="text-gray-500 mb-12 h-20 overflow-y-auto">
              Wage: ${wage} </br>
              ${playerBio}
              </p>

              <div class="grid lg:gap-x-12 md:grid-cols-3">
                <div class="mb-12 md:mb-0">
                  <h2 class="text-xl font-bold text-blue-600 mb-4">${sport}</h2>
                  <h5 class="text-lg font-medium text-gray-500 mb-0">Sport</h5>
                </div>

                <div class="mb-12 md:mb-0">
                  <h2 class="text-xl font-bold text-blue-600 mb-4">${nation}</h2>
                  <h5 class="text-lg font-medium text-gray-500 mb-0">Nation</h5>
                </div>

                <div class="">
                  <h2 class="text-xl font-bold text-blue-600 mb-4">${height} / ${weight}</h2>
                  <h5 class="text-lg font-medium text-gray-500 mb-0">Height / Weight</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Section: Design Block -->

</div>
<!-- Container for demo purpose -->
    </dir>
    
   
    
    
    `;

      playerContainer.insertAdjacentHTML("afterbegin", html);
      playerContainer.style.opacity = 1;
    };
    data.player.map((item) => {
      renderHtml(item);
    });
  });
});
