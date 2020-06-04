
const socket = io();
const {username, room} = Qs.parse(location.search, {
  ignoreQueryPrefix: true
});
//Enter Room
socket.emit('joinRoom', {username, room});
//Get room users
socket.on('roomUsers', ({room, users}) =>{
  outputRoomName(room);
  outputUsers(users);
})
//Message from server
socket.on('chat message', function(msg){
    messageDom(msg);
  //Scroll Down
    const chatMessages = document.querySelector('.chat-messages');
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
document.querySelector('#chat-send').onclick = function(e) {
    e.preventDefault();
    const input = document.querySelector('#chat-input');
    socket.emit('chatMessage', input.value);
    input.value = "";
    input.focus();
};
//Create div and append it to container on message sent
function messageDom(msg){
const div = document.createElement('div')
div.classList.add('message');
div.innerHTML = `<p class="meta">${msg.user} <span>${msg.time}</span></p>
  <p class="text">
    ${msg.text}
  </p>`
  document.querySelector('.chat-messages').appendChild(div);
}
//Add room name to DOM
function outputRoomName(room){
const roomName = document.querySelector('#room-name');
roomName.innerText = "💬 " + room;
};
function outputUsers(users){
const userList = document.querySelector('#users');
userList.innerHTML = `
  ${users.map(user => `<li>${user.username}</li>`).join('')}
  `;
}
