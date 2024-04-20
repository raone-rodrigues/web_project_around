// initialCards
const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

function renderCard(card) {
  const template = document
    .querySelector("#template")
    .content.querySelector(".elements__card");

  const currentCard = template.cloneNode(true);

  currentCard.querySelector(".elements__card-name").textContent = card.name;

  currentCard
    .querySelector(".elements__card-image")
    .setAttribute("src", card.link);

  currentCard
    .querySelector(".elements__card-image")
    .setAttribute("alt", card.name);

  currentCard
    .querySelector(".elements__delete-icon")
    .addEventListener("click", (evt) => {
      const elements = document.querySelector(".elements");
      const card = evt.target.offsetParent;

      elements.removeChild(card);
    });

  currentCard
    .querySelector(".elements__like-icon")
    .addEventListener("click", (evt) => {
      if (evt.target.getAttribute("src") === "./images/like-button.png") {
        return evt.target.setAttribute(
          "src",
          "./images/like-button-clicked.png"
        );
      }

      return evt.target.setAttribute("src", "./images/like-button.png");
    });

  return currentCard;
}

const elements = document.querySelector(".elements");

initialCards.forEach((card, index) => {
  const cardItem = renderCard(card);
  elements.append(cardItem);
});

// popupAddCardOpenAndCloseButton
const addCardButton = document.querySelector(".profile__add-card-icon");
const popupAddCards = document.querySelector(".popup-add-card");
const closePopupAddCardButton = document.querySelector(
  ".popup-add-card__close-button"
);

addCardButton.addEventListener("click", () => {
  popupAddCards.classList.add("popup-add-card_opened");
  validationForm(
    "#input-location-name",
    "#input-image",
    "#input-location-name-error",
    "#input-image-error",
    "#create-button"
  );

  closePopupAddCardButton.addEventListener("click", () => {
    popupAddCards.classList.remove("popup-add-card_opened");
    closePopupAddCardButton.removeEventListener();
  });
});

// popupOpenAndCloseButton
const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close-button");

editButton.addEventListener("click", () => {
  popup.classList.add("popup_opened");
  validationForm(
    "#input-name",
    "#input-role",
    "#input-name-error",
    "#input-role-error",
    "#save-button"
  );

  closePopupButton.addEventListener("click", () => {
    popup.classList.remove("popup_opened");
    closePopupButton.removeEventListener();
  });
});

popup.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup")) {
    popup.classList.remove("popup_opened");
  }
});

popupAddCards.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup-add-card")) {
    popupAddCards.classList.remove("popup-add-card_opened");
  }
});

// popupViewImage
const popupViewImage = document.querySelector(".popup-view-image");
const closePopupViewImageButton = document.querySelector(
  ".popup-view-image__close-button"
);

document.onkeydown = function (event) {
  if (event.key === "Escape") {
    popup.classList.remove("popup_opened");
    popupAddCards.classList.remove("popup-add-card_opened");
    popupViewImage.classList.remove("popup-view-image_opened");
  }
};

const handleViewImageOnPopup = () => {
  const elementsCards = document.querySelectorAll(".elements__card");

  elementsCards.forEach((card) => {
    const image = card.childNodes[3];
    const title = card.childNodes[5].children[0].textContent;
    const popupImage = document.querySelector(
      ".popup-view-image__render-image"
    );
    const poputTitle = document.querySelector(".popup-view-image__image-title");

    image.addEventListener("click", (e) => {
      popupViewImage.classList.add("popup-view-image_opened");

      const imageSource = image.getAttribute("src");
      const imageAlt = image.getAttribute("alt");
      popupImage.setAttribute("src", imageSource);
      popupImage.setAttribute("alt", imageAlt);
      poputTitle.textContent = title;
    });

    closePopupViewImageButton.addEventListener("click", () => {
      popupViewImage.classList.remove("popup-view-image_opened");
      closePopupViewImageButton.removeEventListener();
    });
  });
};

handleViewImageOnPopup();

popupViewImage.addEventListener("click", (event) => {
  if (event.target.classList.contains("popup-view-image")) {
    popupViewImage.classList.remove("popup-view-image_opened");
  }
});

const editProfileForm = document.querySelector(".popup__form");
const addCardForm = document.querySelector(".popup__add-card-form");
const profileName = document.querySelector(".profile__name");
const profileRole = document.querySelector(".profile__role");

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// validateForm
const validationForm = (
  input1Id,
  input2Id,
  inputError1Id,
  inputError2Id,
  actionButtonId
) => {
  const input1 = document.querySelector(input1Id);
  const input2 = document.querySelector(input2Id);
  const inputError1 = document.querySelector(inputError1Id);
  const inputError2 = document.querySelector(inputError2Id);
  const actionButton = document.querySelector(actionButtonId);

  const maxInputLength = 40;
  const minInputLength = 2;

  if (input1.value === "" || input2.value === "") {
    actionButton.disabled = true;
  }

  input1.addEventListener("input", (e) => {
    actionButton.disabled = true;
    if (input1.value.length == 0) {
      inputError1.textContent = "Preencha esse campo.";
      input1.classList.add("popup__input-error");
    } else if (input1.value.length < minInputLength) {
      inputError1.textContent = "O campo deve ter ao menos 2 caracteres.";
      input1.classList.add("popup__input-error");
    } else if (input1.value.length > maxInputLength) {
      inputError1.textContent = "O campo deve ter entre 2 e 40 caracteres.";
      input1.classList.add("popup__input-error");
    } else {
      inputError1.textContent = "";
      input1.classList.remove("popup__input-error");
      if (
        input1.value.length >= minInputLength &&
        input2.value.length >= minInputLength
      ) {
        actionButton.disabled = false;
      }
    }
  });

  input2.addEventListener("input", (e) => {
    actionButton.disabled = true;
    if (input2.value.length == 0) {
      inputError2.textContent = "Preencha esse campo.";
      input2.classList.add("popup__input-error");
    } else if (input2.value.length < minInputLength) {
      inputError2.textContent = "O campo deve ter ao menos 2 caracteres.";
      input2.classList.add("popup__input-error");
    } else if (input2Id == "#input-image" && !input2.value.includes("http")) {
      inputError2.textContent = "Por favor, insira um endereço web.";
      input2.classList.add("popup__input-error");
    } else {
      inputError2.textContent = "";
      input2.classList.remove("popup__input-error");
      if (
        input1.value.length >= minInputLength &&
        input2.value.length >= minInputLength
      ) {
        actionButton.disabled = false;
      }
    }
  });

  if (actionButton.id === "save-button") {
    return handleSaveProfileInformation(input1, input2);
  }

  // preciso concertar o fechamento do popup de criação de card
  if (actionButton.id === "create-button") {
    createButton.addEventListener("click", () => {
      popupAddCards.classList.remove("popup-add-card_opened");
    });
  }
};

const handleSaveProfileInformation = (input1, input2) => {
  const saveButton = document.querySelector("#save-button");

  saveButton.addEventListener("click", () => {
    const newName = input1.value;
    const newRole = input2.value;

    profileName.innerText = newName;
    profileRole.innerText = newRole;

    input1.value = newName;
    input2.value = newRole;

    popup.classList.remove("popup_opened");
  });
};

// handlerCreateNewCardForm
const title = document.querySelector(".profile__name");
const image = document.querySelector(".profile__role");

const inputTitle = document.querySelector("#input-location-name");
const inputImage = document.querySelector("#input-image");
const createButton = document.querySelector(".popup-add-card__create-button");

const cards = document.querySelector(".elements").children;

addCardForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCard = renderCard({
    name: inputTitle.value,
    link: inputImage.value,
  });

  document.querySelector(".elements").prepend(newCard);

  inputImage.value = "";
  inputTitle.value = "";

  handleViewImageOnPopup();
});

createButton.addEventListener("submit", () => {
  addCardForm.classList.remove("popup-add-card_opened");
});
