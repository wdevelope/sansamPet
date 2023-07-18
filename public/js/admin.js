// 로그인 버튼에 걸어 줄 함수
// input : #loginNickname, #loginPassword
// button : login
async function adminlogin() {
  const password = document.querySelector('#loginPassword').value;
  const nickname = document.querySelector('#loginNickname').value;
  const response = await fetch(`http://localhost:3000/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, password }),
  });
  const result = await response.json();
  console.log(result.message);
  if (response.status == 200) {
    if (nickname !== 'ADMIN') {
      socket.emit('LOGIN', {
        nickname,
      });
    } else {
      document.querySelector('body').innerHTML = `<div id = "admin"></div>`;
      socket.emit('ADMINLOGIN', {
        nickname,
      });
    }
  }
  return alert(result.message);
}

// 소켓을 이용해 받은 정보를 알림 띄운다.

const socket = io.connect('/');

socket.on('LOGIN_DATA', function (data) {
  const { nickname, date } = data;
  loginNotification(nickname, date);
});

function loginNotification(targetNickname, date) {
  const messageHtml = `${targetNickname}님이 방금 접속하였습니다. <br /><small>(${date})</small>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close">X</button>`;
  const alt = document.querySelector('#customerAlert');
  if (alt) {
    alt.html(messageHtml);
  } else {
    const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" role="alert">${messageHtml}</div></br>`;

    const alertlist = document.querySelector('#admin');
    alertlist.insertAdjacentHTML('afterbegin', htmlTemp);
  }
}
