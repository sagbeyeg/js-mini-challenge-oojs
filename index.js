const BASE_URL = "http://localhost:3000"

/***** DOM Elements *****/
const playerContainer = document.querySelector(".player-container")
const newPlayerForm = document.querySelector("#new-player-form")

/***** Event Handlers *****/
const handleNewPlayerSubmit = event => {
  event.preventDefault()

  const playerData = {
    number: newPlayerForm.number.value,
    name: newPlayerForm.name.value,
    nickname: newPlayerForm.nickname.value,
    photo: newPlayerForm.photo.value,
    likes: 0
  }

  // fetch
  const url = `${BASE_URL}/players`
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(playerData)
  }

  fetch(url, config)
    .then(r => r.json())
    .then(playerObj => {
      // const playerComponent = new PlayerComponent(playerObj)
      // console.log(playerComponent)
      // playerComponent.render(playerContainer)
      renderPlayer(playerObj)
    })
}

/***** Event Listeners *****/
newPlayerForm.addEventListener("submit", handleNewPlayerSubmit)

/***** Render Helpers *****/
const renderPlayer = playerObj => {
  const playerDiv = document.createElement("div")

  playerDiv.className = "player"
  playerDiv.dataset.number = playerObj.number

  playerDiv.innerHTML = `
    <h3>${playerObj.name} (<em>${playerObj.nickname}</em>)</h3>
    <img src="${playerObj.photo}" alt="${playerObj.name}">
    <p class="likes">${playerObj.likes} likes</p>
    <button class="like-button">❤️</button>
  `

  const likeButton = playerDiv.querySelector(".like-button")
  likeButton.addEventListener("click", () => {
    playerObj.likes++
    const likesPTag = playerDiv.querySelector(".likes")
    likesPTag.textContent = `${playerObj.likes} likes`

    // fetch
    const url = `${BASE_URL}/players/${playerObj.id}`
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: playerObj.likes })
    }

    fetch(url, config)
  })

  playerContainer.append(playerDiv)
}

/***** Initialize *****/
const initialize = () => {
  
  // fetch
  const url = `${BASE_URL}/players`
  fetch(url)
    .then(r => r.json())
    .then(players => {
      players.forEach(playerObj => {
        // const playerComponent = new PlayerComponent(playerObj)
        // console.log(playerComponent)
        // playerComponent.render(playerContainer)
        renderPlayer(playerObj)
      })
    })
}

initialize()