const chatBox = document.querySelector('.chatBox');
const audio = document.querySelector('audio');
const chatMess = document.querySelector('.chatForm input[type="text"]');
const chatForm = document.querySelector('.chatForm');
const errorMess = document.querySelector('.errorMess');

let quackArray = [];
let userArray = [];
let canSubmit = true;

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleSubmit(e);
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') handleSubmit(e);
});

function submit() {
    const message = chatMess.value;

    const chatItem = document.createElement('div');
    chatItem.classList.add('user-chat-item');
    chatItem.innerHTML = `<img src="./user.png" alt="userIcon" id="userIcon"/>&ensp;&ensp;${message}`;
    chatBox.appendChild(chatItem);
    chatItem.scrollIntoView(true);
    userArray.push(chatItem);

    const chatItemD = document.createElement('div');
    chatItemD.classList.add('duck-chat-item');
    chatItemD.innerHTML = `<img src="./duck.jpg" alt="duckIcon" id="duckIcon"/>&ensp;&ensp;`;
    chatBox.appendChild(chatItemD);
    quackArray.push(chatItemD);

    if (message == 'food') food(chatItemD);
    else if (message == '') { quackArray[quackArray.length - 1].remove(); userArray[userArray.length - 1].remove(); }
    else reply(chatItemD);

    chatMess.value = '';
}

function reply(chatItem) {
    let randomNumber = Math.floor(Math.random() * 10);
    if (randomNumber <= 0) randomNumber = 1;
    let text = '';
    for (let i = 1; i <= randomNumber; i++) text += 'quack ';
    const texts = text.split(' ');

    let i = 0;
    function quack() {
        const tLength = texts.length;
        if (i < tLength) {
            chatItem.innerHTML += `${texts[i]} `
            chatBox.appendChild(chatItem);
            audio.play();
            i++;
            setTimeout(quack, 200);
        };

    };
    quack();

    chatItem.scrollIntoView(true);
};

function food(chatItem) {
    chatItem.innerHTML += `Vịt quay ngon`
    chatBox.appendChild(chatItem);
    audio.play();

    chatItem.scrollIntoView(true);
}

let countdown = 5;
let timer;
function handleSubmit() {
    if (canSubmit) {
        canSubmit = false;
        timer = setInterval(updateCountdown, 1000);
        submit();
    }
}

function updateCountdown() {
    countdown--;
    errorMess.textContent = `Waiting ${countdown} seconds`;
    if (countdown === 0) {
        clearInterval(timer);
        canSubmit = true;
        countdown = 5;
        errorMess.textContent = "";
    }
}