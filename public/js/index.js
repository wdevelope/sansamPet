// 시작하자 실행 될 함수들
listsimanis();
enter();
buttons();

const socket = io.connect('/');

socket.on('NOTICE_EVERYONE', function (data) {
  const { notice, date } = data;
  noticeNotification(notice, date);
});

function noticeNotification(notice, date) {
  const messageHtml = `공지사항 <br/>${notice} <br/><small>(${date})</small>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>`;
  const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" id="noticeAlert" role="alert">${messageHtml}</div></br>`;
  document.querySelector('#navbar').insertAdjacentHTML('afterend', htmlTemp);
}
//로고 홈으로
function logo() {
  location.href = 'http://localhost:3000';
}

function enter() {
  document.getElementById('search').addEventListener('keyup', function (e) {
    if (e.code === 'Enter') {
      document.getElementById('searchBtn').click();
    }
  });
}

//로그인
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
    socket.emit('LOGIN', {
      nickname,
    });
    sessionStorage.setItem(
      'Authorization',
      response.headers.get('Authorization'),
      localStorage.setItem('loginId', nickname),
    );
    location.reload();
  }
  return alert(result.message);
}

function adminapage() {
  location.href = 'http://localhost:3000/admin.html';
}
//버튼
function buttons() {
  if (sessionStorage.getItem('authorization')) {
    const reservationBtn = document.querySelector('#reservationBtn');
    const loginBtn = document.querySelector('#loginBtn');
    const signupBtn = document.querySelector('#signupBtn');
    const logoutBtn = document.querySelector('#logoutBtn');

    reservationBtn.style.display = 'block';
    logoutBtn.style.display = 'block';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
  }
  if (localStorage.getItem('loginId') == 'ADMIN') {
    const adminBtn = document.querySelector('#adminBtn');
    adminBtn.style.display = 'block';
  }
}
//회원가입
async function signup() {
  const confirm = document.querySelector('#confirmPassword').value;
  const password = document.querySelector('#registerPassword').value;
  const nickname = document.querySelector('#registerNickname').value;
  const response = await fetch(`http://localhost:3000/api/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, password, confirm }),
  });
  const result = await response.json();
  console.log(result.message);
  return alert(result.message);
}

// 예약 조회 클릭
function clickReservation() {
  location.href = 'http://localhost:3000/reservation.html';
}

// 심마니 클릭
function clicksimani(petsitterId) {
  localStorage.setItem('clickedPetsitter', `${petsitterId}`);
  location.href = 'http://localhost:3000/sitterInfo.html';
}

// 심마니들 카드 붙이기
async function listsimanis() {
  const response = await fetch(`http://localhost:3000/api/petsitters`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result.message);
  const simanis = result.petsitters
    .map(simani => {
      let star_repeat = '⭐️'.repeat(simani.star);
      return `
      <div class="card" style="width: 18rem" onclick ="clicksimani(${simani.petsitterId})">
        <img src="${simani.imgurl}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${simani.name}</h5>
          <p class="card-text">${simani.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${star_repeat}</li>
          <li class="list-group-item">${simani.signInCareer} 일간 산삼을 키웠습니다.</li>
        </ul>
      </div>`;
    })
    .join('');
  document.querySelector('main').innerHTML = simanis;
  return;
}

// 로그아웃
async function logout() {
  const response = await fetch(`http://localhost:3000/api/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result.message);
  sessionStorage.clear();
  location.reload();
  return alert(result.message);
}

// 검색
async function search() {
  const name = document.querySelector('#search').value;
  const response = await fetch(
    `http://localhost:3000/api/petsitterssearch?name=${name}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();
  console.log(result.message);
  const simani = result.petsitter;
  let star_repeat = '⭐️'.repeat(simani.star);
  const data = `
      <div class="card" style="width: 18rem" onclick ="clicksimani(${simani.petsitterId})">
        <img src="${simani.imgurl}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${simani.name}</h5>
          <p class="card-text">${simani.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${star_repeat}</li>
          <li class="list-group-item">${simani.signInCareer} 일간 산삼을 키웠습니다.</li>
        </ul>
      </div>`;
  document.querySelector('main').innerHTML = data;
  return;
}
