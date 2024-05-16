const socket = io('http://localhost:8000/');

const form =  document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");
// var audio = new Audio('ting.mp3');


const append = (message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    // if(position=='left'){
    //     audio.play();
    // }
   
}
// if the form get submited, send server the message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`,'right');
    socket.emit('send', message);
    messageInput.value = ''
});
// ask new user for his/her name and let the server know
const name1 = prompt("enter your name to join");
socket.emit('new-user-joined', name1);

// if a new user joins, receive his/her name from the server
socket.on('user-joined', name1 =>{
    append(`${name1} joined the chat`,'right')
});

// if server sends a message, receive it
socket.on('receive', data =>{
    append(`${data.name1}: ${data.message}`,'left')
});

// if a user leave the chat, append the info to the container
socket.on('left', name1 =>{
    append(`${name1} left the chat `,'right')
});