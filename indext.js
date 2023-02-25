const submitBtn = document.querySelector('.chatForm button[type="submit"]');
const chatBox = document.querySelector('.chatBox');
const audio = document.querySelector('audio');

submitBtn.addEventListener('click', () => {
    submit();
});

document.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') submit();
});

function submit() {

    const messValue = document.querySelector('.chatForm input[type="text"]').value;
    const chatItem = document.createElement('div');

    chatItem.classList.add('user-chat-item');
    chatItem.innerHTML = `<img src="./user.png" alt="userIcon" id="userIcon"/>&ensp;&ensp;${messValue}`;
    chatBox.appendChild(chatItem);
    chatItem.scrollIntoView(true);

    document.querySelector('.chatForm input[type="text"]').value = ' ';

    const chatItemD = document.createElement('div');
    chatItemD.classList.add('duck-chat-item');
    chatItemD.innerHTML = `<img src="./duck.jpg" alt="duckIcon" id="duckIcon"/>&ensp;&ensp;`
    chatBox.appendChild(chatItemD);

    if (messValue == 'food') { food(chatItemD) }
    else setTimeout(reply(chatItemD), 100);
}

function reply(chatItem) {

    const randomNumber = Math.floor(Math.random() * 10);
    let text = '';
    for (let i = 1; i < randomNumber; i++) text += 'quack ';
    const texts = text.split(' ');

    let i = 0;
    function quack() {
        if (i < texts.length) {
            chatItem.innerHTML += `${texts[i]} `
            chatBox.appendChild(chatItem);
            audio.play();
            i++;
            setTimeout(quack, 200);
        }

    }

    quack();
    chatItem.scrollIntoView(true);
}

function food(chatItem) {
    chatItem.innerHTML += `Vit quay ngon`
    chatBox.appendChild(chatItem);
    audio.play();
    chatItem.scrollIntoView(true);
}