// 로그인 버튼에 걸어 줄 함수
// input : #loginNickname, #loginPassword
// button : login
async function login() {
  const password = document.querySelector('#loginPassword').value;
  const nickname = document.querySelector('#loginNickname').value;
  const loginbtn = document.querySelector('#loginbtn');
  const signupbtn = document.querySelector('#signupbtn');
  const reservationbtn = document.querySelector('#reservationbtn');
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
    loginbtn.style.display = none;
    signupbtn.style.display = none;
    reservationbtn.style.display = block;
  }
  return alert(result.message);
}

// 회원가입 버튼에 걸어줄 함수
// input : #signupNickname, #signupPassword, #signupConfirm
// button : signup
async function signup() {
  const confirm = document.querySelector('#signupConfirm').value;
  const password = document.querySelector('#signupPassword').value;
  const nickname = document.querySelector('#signupNickname').value;
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
  document.querySelector('main').insertAdjacentHTML('beforeend', simanis);
  return;
}
