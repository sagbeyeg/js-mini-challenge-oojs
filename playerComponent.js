console.log("In the player container")

class PlayerComponent {
  constructor(player) {
    this.player = player
  };

  render(parentElement) {
    this.element = document.createElement("div")

    this.element.className = "player"
    this.element.dataset.number = this.player.number

    this.element.innerHTML = `
      <h3>${this.player.name} (<em>${this.player.nickname}</em>)</h3>
      <img src="${this.player.photo}" alt="${this.player.name}">
      <p class="likes">${this.player.likes} likes</p>
      <button class="like-button">❤️</button>
    `

    const likeButton = this.element.querySelector(".like-button")
    likeButton.addEventListener("click", () => {
      this.player.likes++
      const likesPTag = this.element.querySelector(".likes")
      likesPTag.textContent = `${this.player.likes} likes`

      // fetch
      const url = `${BASE_URL}/players/${this.player.id}`
      const config = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ likes: this.player.likes })
      }

      fetch(url, config)
    })

    parentElement.append(this.element)
  };

  like = () => {
    this.player.likes++
    const likesPTag = this.element.querySelector(".likes")
    likesPTag.textContent = `${this.player.likes} likes`

    // fetch
    const url = `${BASE_URL}/players/${this.player.id}`
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ likes: this.player.likes })
    }

    fetch(url, config)
  }
}