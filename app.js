let tg = window.Telegram.WebApp;

tg.expand();

let selectedCards = {}; // объект для хранения выбранных карточек в каждом ряду
let selectedProducts = []; // массив для хранения выбранных продуктов

function handleCardClick(btn) {
    const rowId = btn.parentNode.id;

    // Убрать класс selected у предыдущей выбранной карточки в ряду
    if (selectedCards[rowId]) {
        selectedCards[rowId].classList.remove("selected");
    }

    // Добавить класс selected к текущей карточке
    btn.classList.add("selected");

    // Сохранить текущую карточку в объекте selectedCards
    selectedCards[rowId] = btn;

    // Проверка, что выбрана по одной карточке в каждом ряду
    if (Object.keys(selectedCards).length === 3) {
        selectedProducts = Object.values(selectedCards).map(card => card.querySelector("h3").innerText);
        tg.MainButton.show();
        tg.MainButton.text = "Сделать заявку";
    }
}

function enableSwipe(rowId) {
    const row = document.getElementById(rowId);
    const hammer = new Hammer(row);

    hammer.on("swipeleft swiperight", function (event) {
        if (event.type === "swiperight") {
            row.scrollLeft -= 100;
        } else if (event.type === "swipeleft") {
            row.scrollLeft += 100;
        }
    });
}

let buttons = document.querySelectorAll(".card");

buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
        handleCardClick(btn);
    });
});

enableSwipe("row1");
enableSwipe("row2");
enableSwipe("row3");

Telegram.WebApp.onEvent('mainButtonClicked', function () {
    tg.sendData(selectedProducts.join(', '));
    // при клике на основную кнопку отправляем данные в строковом виде
    // selectedProducts доступны здесь
});