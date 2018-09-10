"use strict";

// Card class creation

/** This class aims to create a simple card from the endpoint response
 * @constructor
 * @param {string} divHolder - The DOM element ID.
 * @param {id} id - the post ID to be rendered.
 */
class Card {
  constructor(divHolder, id) {
    this.id = id;
    this.cardsHolder = document.getElementById(divHolder);
    this.cardElement = "";
    //style classes
    this.$card = "card";
    this.$title = "card-title";
    this.$body = "card-body";
  }
  /**
   * This method get a response from the API and Renders on DOM
   */
  render() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${this.id}`)
      .then(response => response.json())
      .then(data => {
        let title = data.title;
        let body = data.body;
        this.onDisplay(title, body);
      });
  }
  /**
   * This method creates the Single Card container on DOM
   */
  cardContainer() {
    //Card container
    let card = document.createElement("div");
    //Card Id
    card.id = `${this.id}`;
    //Card class
    card.className = this.$card;
    this.cardsHolder.appendChild(card);
    this.cardElement = card;
    return this.cardElement;
  }
  /**
   *
   * @param {string} cardElement - Element where the Title would be appended
   * @param {string} content - The text content for a title
   */
  cardTitle(cardElement, content) {
    //Card Title element
    let cardTitle = document.createElement("h3");
    cardTitle.className = this.$title;
    cardTitle.innerText = content;
    cardElement.appendChild(cardTitle);
  }
  /**
   *
   * @param {string} cardElement - Element where the Body would be appended
   * @param {string} content - The text content for card's body
   */
  cardBody(cardElement, content) {
    //Card Body element
    let cardBody = document.createElement("p");
    cardBody.className = this.$body;
    cardBody.innerText = content;
    cardElement.appendChild(cardBody);
  }
  /**
   *
   * @param {string} cardElement - Element where the button would be appended
   */
  deleteCard(cardElement) {
    // Delete Card Button element
    let removeCard = document.createElement("button");
    removeCard.textContent = `Remove post: ${this.id}`;
    removeCard.addEventListener("click", () => this.cardRemove());
    cardElement.appendChild(removeCard);
  }
  /**
   * This method select the card by ID attribute and remove from DOM
   */
  cardRemove() {
    let element = document.getElementById(`${this.id}`);
    element ? this.cardsHolder.removeChild(element) : "";
  }

  onDisplay(title, body) {
    this.cardRemove();
    this.cardContainer();
    let element = this.cardElement;
    this.cardTitle(element, title);
    this.cardBody(element, body);
    this.deleteCard(element);
  }
}
//Selectors on DOM
const cards = document.getElementById("cards-holder");
const testDiv = document.getElementById("test");
const links = document.querySelectorAll("#card-trigger li a");

// Event listener on each link to create a Card object
links.forEach(el => el.addEventListener("click", createCard));

//To link listener
function createCard(e) {
  let postId = e.target.dataset.sku;

  //   console.log(postId);
  let card = new Card("cards-holder", postId);
  card.render();
}

//Remove Link selector
let removeCards = document.getElementById("remover");

// Remove every card on the cards-holder
removeCards.addEventListener("click", () => {
  cards.innerText = "";
});
