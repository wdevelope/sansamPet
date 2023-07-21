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

//로고 홈으로
function logo() {
  location.href = 'http://localhost:3000';
}

function loginNotification(targetNickname, date) {
  const messageHtml = `${targetNickname}님이 로그인하였습니다. <br /><small>(${date})</small>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>`;
  const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" id="adminalert" role="alert">${messageHtml}</div></br>`;
  const alertlist = document.querySelector('#alertlist');
  alertlist.insertAdjacentHTML('afterbegin', htmlTemp);
}

listReservations();
listReviews();

async function listReservations() {
  const response = await fetch(`http://localhost:3000/api/admin/reservations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
  const result = await response.json();
  console.log(result.message);
  if (response.status == 200) {
    socket.emit(result.ROOMTITLE);
    document.querySelector('#registerSimani').style.display = 'block';
    document.querySelector('#editSimani').style.display = 'block';
    document.querySelector('#deleteSimani').style.display = 'block';
    document.querySelector('#superDeleteSimani').style.display = 'block';
  }

  const reservations = result.reservations
    .map(reservation => {
      return `
      <div id = "reservation">
      <p id="resvtitle">예약 번호: ${reservation.reservationId}</p>
      <p>예약 날짜: ${reservation.reservationAt}</p>
      <p>산삼 시터: ${reservation.Petsitter.name}</p>
      <p>고객 성함: ${reservation.User.nickname}</p>
      <p>삭제 날짜: ${reservation.deletedAt}</p>
      <button type="button" class="btn btn-outline-light my-2 my-sm-0" onclick="superDeleteResv(${reservation.reservationId})">삭제</button>
      </div>
       `;
    })
    .join('');
  const noticebox = `<div id = noticebox>
                    <label>공지사항</label></br>
                    <textarea id="noticecontent"></textarea>
                    <button class="btn btn-outline-light my-2 my-sm-0" onclick="notice()">모든 사용자에게 알림 전송</button>
                    <div>`;
  document.querySelector('#reservationlist').innerHTML = reservations;
  document.querySelector('#notice').innerHTML = noticebox;
  return;
}

async function registerSimani() {
  const description = document.querySelector('#description').value;
  const name = document.querySelector('#registerNickname').value;
  const signInCareer = document.querySelector('#signInCareer').value;
  const imgurl = document.querySelector('#imgurl').value;
  const response = await fetch(`http://localhost:3000/api/admin/simanis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ signInCareer, imgurl, name, description }),
  });
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}

async function editSimani() {
  const description = document.querySelector('#editdescription').value;
  const name = document.querySelector('#editNickname').value;
  const signInCareer = document.querySelector('#editsignInCareer').value;
  const imgurl = document.querySelector('#editimgurl').value;
  const response = await fetch(
    `http://localhost:3000/api/admin/simanis?name=${name}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ signInCareer, imgurl, description }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  return alert(result.message);
}

async function deleteSimani() {
  const name = document.querySelector('#deleteNickname').value;
  const response = await fetch(
    `http://localhost:3000/api/admin/simanis?name=${name}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  return alert(result.message);
}

async function superDeleteSimani() {
  const name = document.querySelector('#superDeleteNickname').value;
  const response = await fetch(
    `http://localhost:3000/api/superadmin/simanis?name=${name}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  return alert(result.message);
}

async function superDeleteResv(reservationId) {
  const response = await fetch(
    `http://localhost:3000/api/admin/reservations?reservationId=${reservationId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  listReservations();
  return alert(result.message);
}

async function listReviews() {
  const response = await fetch(
    `http://localhost:3000/api/petsitters/:petsitterId/reviewsAll`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);

  const reservlistw = result.allPost
    .map(resrelist => {
      return `
      <div id = "reservation">
      <p id="resvtitle">예약 번호: ${resrelist.reservationId}</p>
      <p>작성 날짜: ${resrelist.createdAt}</p>
      <p>산삼 시터: ${resrelist.Petsitter.name}</p>
      <p>고객 성함: ${resrelist.User.nickname}</p>
      <p>삭제 날짜: ${resrelist.deletedAt}</p>
      <button type="button" class="btn btn-outline-light my-2 my-sm-0" onclick="deletesol(${resrelist.reviewId})">삭제</button>
      </div>
       `;
    })
    .join('');

  document.querySelector('#reviewlist').innerHTML = reservlistw;
  return;
}

async function deletesol(reviewId) {
  const response = await fetch(
    `http://localhost:3000/api/admin/reviews/${reviewId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  location.reload();
  return alert(result.message);
}
