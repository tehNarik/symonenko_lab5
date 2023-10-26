var navBlock = document.getElementById('nav');
var rightBlock = document.getElementById('right_down');
navBlock.outerHTML = '<div id="right_down"><p>Тут може бути ваша реклама</p></div>';
rightBlock.outerHTML = '<nav id="nav"><p>\tМеню    Відгуки    Контакти </p>  </nav>';




function getSquare(){
    var block = document.getElementById('main');
    return (block.offsetHeight*block.offsetWidth);
}
//alert("Площа паралелограма: " + getSquare() + " пікселів");





function findMaxDigit() {
    // Отримання значення з форми
    var inputValue = document.getElementById('numberInput').value;

    var maxDigit = Math.max(...inputValue.split('').map(Number));

    document.cookie = 'maxDigit=' + maxDigit;

    // Показ діалогового вікна з результатом
    alert('Максимальна цифра: ' + maxDigit);
  }

  // Функція для зчитування cookies при завантаженні сторінки
  function readCookiesOnLoad() {
    var cookies = document.cookie;
    var maxDigitCookie = cookies.split(';').find(cookie => cookie.includes('maxDigit'));

    if (maxDigitCookie) {
        var maxDigitValue = maxDigitCookie.split('=')[1];
        var userConfirmation = confirm('Інформація, збережена в cookies:\n\nМаксимальна цифра: ' + maxDigitValue +
            '\n\nНатисніть "ОК", щоб видалити cookies та перезавантажити сторінку.');
        if (userConfirmation) {
            // Видалення cookies з затримкою і перезавантаження сторінки
            document.cookie = 'maxDigit=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            setTimeout(function () {
                location.reload();
            }, 100); // Зачекайте 100 мілісекунд перед перезавантаженням
        }
    }
}


  // Викликати функцію зчитування cookies при завантаженні сторінки
  window.onload = readCookiesOnLoad;





  document.addEventListener("DOMContentLoaded", function () {
    var radioButtons = document.getElementsByName("alignment");
    var storedAlignmentValue = localStorage.getItem('alignmentValue');
    var mouseEvent = 'ontouchstart' in window ? 'touchstart' : 'mouseout';
    // Завантаження значення з localStorage, якщо воно є
    if (storedAlignmentValue) {
        alignmentValue = storedAlignmentValue;
        // Встановлення відповідної радіо-кнопки при завантаженні сторінки
        radioButtons.forEach(function (radio) {
            if (radio.value === storedAlignmentValue) {
                radio.checked = true;
            }
        });
        alignRight(); // Виклик функції для встановлення відповідного вирівнювання
    }

    radioButtons.forEach(function (radio) {
        radio.addEventListener("change", function () {
            if (radio.checked) {
                alignmentValue = radio.value;
                localStorage.setItem('alignmentValue', alignmentValue);
                alignRight();
            }
        });
    });

    // Додаємо обробники подій onmouseout для кожного блоку
    document.getElementById('left_aside').addEventListener(mouseEvent, alignRight);
    document.getElementById('main').addEventListener(mouseEvent, alignRight);
    document.getElementById('right_aside').addEventListener(mouseEvent, alignRight);

});

function alignRight() {
    var container1 = document.getElementById('left_aside');
    var container2 = document.getElementById('main');
    var container3 = document.getElementById('right_aside');

    if (alignmentValue === 'left') {
        container1.style.textAlign = 'right';
        container2.style.textAlign = 'center';
        container3.style.textAlign = 'center';
    } else if (alignmentValue === 'center') {
        container1.style.textAlign = 'center';
        container2.style.textAlign = 'right';
        container3.style.textAlign = 'center';
    } else if (alignmentValue === 'right') {
        container1.style.textAlign = 'center';
        container2.style.textAlign = 'center';
        container3.style.textAlign = 'right';
    }
}



var maxItems = 13;
var itemCount = document.getElementById('dynamicList').childElementCount;

var savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

function addItemToList() {
    var selectedValue = document.getElementById('dynamicSelect').value;

    if (itemCount < maxItems) {
        var newItem = document.createElement('li');
        newItem.textContent = selectedValue;
        document.getElementById('dynamicList').appendChild(newItem);

        savedItems.push(selectedValue);
        localStorage.setItem('savedItems', JSON.stringify(savedItems));

        itemCount++;
    } else {
        alert('Досягнуто максимальну кількість елементів (13). Оновіть сторінку.');
    }
}

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('savedItems');
});