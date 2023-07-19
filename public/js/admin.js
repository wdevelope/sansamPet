const socket = io.connect('/');

socket.on('LOGIN_DATA', function (data) {
  const { nickname, date } = data;
  loginNotification(nickname, date);
});

function notice() {
  const noticecontent = document.querySelector('#noticecontent').value;
  socket.emit('NOTICE', {
    notice: noticecontent,
  });
}

async function login() {
  const password = document.querySelector('#password').value;
  const nickname = document.querySelector('#nickname').value;
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
        nickname: `관리자 페이지에 권한이 없는 사용자${nickname}`,
      });
      document.querySelector(
        'main',
      ).innerHTML = `<h2>접근 권한이 없습니다.</h2>`;
      return alert('권한이 없습니다.');
    } else {
      socket.emit('ADMINLOGIN', {
        nickname,
      });
      listReservations();
      return alert(result.message);
    }
  }
}

function loginNotification(targetNickname, date) {
  const messageHtml = `${targetNickname}님이 로그인하였습니다. <br /><small>(${date})</small>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>`;
  const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" id="adminalert" role="alert">${messageHtml}</div></br>`;
  const alertlist = document.querySelector('#alertlist');
  alertlist.innerHTML = htmlTemp;
}

async function listReservations() {
  document.querySelector('#registerSimani').style.display = 'block';
  document.querySelector('#editSimani').style.display = 'block';
  document.querySelector('#deleteSimani').style.display = 'block';
  document.querySelector('#adminlogin').style.display = 'none';
  const response = await fetch(`http://localhost:3000/api/admin/reservations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result.message);
  const reservations = result.reservations
    .map(reservation => {
      return `
      <div id = "reservation">
      <h4>예약 번호: ${reservation.reservationId}</h4>
      <p>예약 날짜: ${reservation.reservationAt}</p>
      <p>산삼 시터: ${reservation.Petsitter.name}</p>
      <p>고객 성함: ${reservation.User.nickname}</p>
      </div>
       `;
    })
    .join('');
  const noticebox = `
                    <label>공지사항</label></br>
                    <textarea id="noticecontent"></textarea>
                    <button onclick="notice()">모든 사용자에게 알림 전송</button>`;
  document.querySelector('#reservationlist').innerHTML = reservations;
  document.querySelector('#notice').innerHTML = noticebox;
  return;
}

async function createSimani() {
  const reservationAt = document.querySelector('#date').value;
  const petsitterId = Number(localStorage.getItem('clickedPetsitter'));
  const response = await fetch(`http://localhost:3000/api/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reservationAt, petsitterId }),
  });
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}
