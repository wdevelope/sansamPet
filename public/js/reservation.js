listReservations();

const socket = io.connect('/');

socket.on('NOTICE_EVERYONE', function (notice) {
  noticeNotification(notice.notice);
});

function logo() {
  location.href = 'http://localhost:3000';
}

function noticeNotification(notice, date) {
  const messageHtml = `공지사항 <br/>${notice} <br/><small>(${date})</small>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>`;
  const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" id="noticeAlert" role="alert">${messageHtml}</div></br>`;
  document.querySelector('#navbar').insertAdjacentHTML('afterend', htmlTemp);
}

async function editReservation(reservationId) {
  const reservationAt = document.querySelector('#date').value;
  const petsitterId = document.querySelector('#simanichoice').value;
  const response = await fetch(
    `http://localhost:3000/api/reservations?reservationId=${reservationId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ reservationAt, petsitterId }),
    },
  );
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}

async function deleteReservation(reservationId) {
  const response = await fetch(
    `http://localhost:3000/api/reservations?reservationId=${reservationId}`,
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
  window.location.reload();
  return alert(result.message);
}

async function listReservations() {
  const response = await fetch(`http://localhost:3000/api/reservations`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
  });
  const result = await response.json();
  console.log(result.message);
  const reservations = result.reservations
    .map(reservation => {
      return `<div class="row justify-content-center mt-3">
                <div class="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title">심마니 ${
                        reservation.petsitter_name
                      }</h5>
                      <p>예약 번호: ${reservation.reservationId}</p>
                      <p class="card-text"> 
                      ${reservation.reservationAt.substr(0, 10)} 예약 완료!</p>
                      <button type="button" id="resvBtn" data-toggle="modal"
                      data-target="#loginModal">
                      수정
                    </button>
                      <button id="resvBtn" onclick="deleteReservation(
                        ${reservation.reservationId})">삭제</button>
                    </div>
                  </div>
                </div>
              </div>
            <div>
            <div
              class="modal fade"
              id="loginModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">예약 수정</h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="date">날짜</label>
                        <input type="date" class="form-control" id="date" />
                      </div>
                      <label>심마니 선택</label></br>
                      <select class="form-select" id="simanichoice">
                        <option selected>-- 나의 원픽 --</option>
                        <option value="1">이다영</option>
                        <option value="2">우성원</option>
                        <option value="3">엄한솔</option>
                        <option value="4">김민준</option>
                        <option value="5">원장님</option>
                      </select>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick="editReservation(${
                      reservation.reservationId
                    })">
                      수정
                    </button>
                  </div>
                </div>
              </div>
            </div>
            `;
    })
    .join('');
  document.querySelector('#reservations').innerHTML = reservations;
  return;
}
