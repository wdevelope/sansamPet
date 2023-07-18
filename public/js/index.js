// 시작하자 실행 될 함수들
// listsimanis();
buttons();

const socket = io.connect('/');

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
    sessionStorage.setItem('loggedin', '1');
    location.reload();
  }
  return alert(result.message);
}

function buttons() {
  if (sessionStorage.getItem('loggedin') == 1) {
    const reservationBtn = document.querySelector('#reservationBtn');
    const loginBtn = document.querySelector('#loginBtn');
    const signupBtn = document.querySelector('#signupBtn');
    reservationBtn.style.display = 'block';
    loginBtn.style.display = 'none';
    signupBtn.style.display = 'none';
  }
}

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
function clicksimani() {
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
      return `
      <div class="card" style="width: 18rem">
        <img src="${simani.imgurl}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${simani.name}</h5>
          <p class="card-text">${simani.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">An item</li>
          <li class="list-group-item">A second item</li>
          <li class="list-group-item">A third item</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link">Card link</a>
          <a href="#" class="card-link">Another link</a>
        </div>
      </div>`;
    })
    .join('');
  document.querySelector('main').innerHTML = simanis;
  return;
}
