const socket = io.connect('/');

socket.on('LOGIN_DATA', function (data) {
  console.log('여기 실행');
  const { nickname, date } = data;
  loginNotification(nickname, date);
});

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
      return alert('권한이 없습니다.');
    } else {
      listReservations();
      socket.emit('ADMINLOGIN', {
        nickname,
      });
      return alert(result.message);
    }
  }
}

function loginNotification(targetNickname, date) {
  const messageHtml = `${targetNickname}님이 로그인하였습니다. <br /><small>(${date})</small>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>`;
  const alt = document.querySelector('#customerAlert');
  if (alt) {
    alt.html(messageHtml);
  } else {
    const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" role="alert">${messageHtml}</div></br>`;

    const alertlist = document.querySelector('#alertlist');
    alertlist.insertAdjacentHTML('afterbegin', htmlTemp);
  }
}

async function listReservations() {
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
      <p>예약 번호: ${reservation.reservation_id}</p>
      <p>예약 날짜: ${reservation.reservationAt}</p>
      <p>산삼 시터: ${reservation.Petsitter.name}</p>
      <p>고객 성함: ${reservation.User.nickname}</p>
      </div>
       `;
    })
    .join('');
  document.querySelector('#reservationlist').innerHTML = reservations;
  return;
}
