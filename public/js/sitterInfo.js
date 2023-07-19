simani();
const socket = io.connect('/');

socket.on('NOTICE_EVERYONE', function (notice) {
  noticeNotification(notice.notice);
});

function noticeNotification(notice, date) {
  const messageHtml = `공지사항 <br/>${notice} <br/><small>(${date})</small>
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">x</button>`;
  const htmlTemp = `<div class="alert alert-warning alert-dismissible fade show" id="noticeAlert" role="alert">${messageHtml}</div>`;
  document.querySelector('#navbar').insertAdjacentHTML('afterend', htmlTemp);
}

async function makeReservation() {
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

async function simani() {
  const petsitterId = Number(localStorage.getItem('clickedPetsitter'));
  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}`,
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
  const simanidata = ` <div class="container mt-4">
                        <div class="row justify-content-center">
                            <div class="col-md-5">
                            <div class="card">
                                <div class="card-img-container">
                                <img src="${simani.imgurl}" alt="Sitter Image" />
                                </div>
                                <div class="card-body">
                                <h5 class="card-title">${simani.name}</h5>
                                <p class="card-text">
                                    ${simani.description}
                                </p>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary" data-toggle="modal" data-target="#reservationModal">
                                    예약하기
                                    </button>
                                </div>
                                <hr />
                                <h6>리뷰 작성</h6>
                                <div class="form-group">
                                    <textarea class="form-control" rows="4" placeholder="리뷰 내용"></textarea>
                                    <div class="input-group mb-3">
                                    <label class="input-group-text" for="inputGroupSelect01">별점</label>
                                    <select class="form-select" id="star">
                                        <option selected>-- 선택하기 --</option>
                                        <option value="1">⭐</option>
                                        <option value="2">⭐⭐</option>
                                        <option value="3">⭐⭐⭐</option>
                                        <option value="4">⭐⭐⭐⭐</option>
                                        <option value="5">⭐⭐⭐⭐⭐</option>
                                    </select>
                                    <input id = "reservationId" placeholder="예약 번호"></input>
                                    </div>
                                </div>
                                <button class="btn btn-success" onclick="reviewCreate(${petsitterId})">리뷰 작성</button>
                                </div>
                                <div id="reviewsList">
                                  <!-- 리뷰 붙는 곳 -->
                                </div>
                            </div>
                            </div>
                            <div class="col-md-7">
                            <!-- 예약 현황 div -->
                            <div class="card">
                                <div class="card-body">
                                <h5 class="card-title">예약 현황</h5>
                                <!-- 예약 현황 내용 추가 -->
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div class="modal fade" id="reservationModal" tabindex="-1" role="dialog" aria-labelledby="reservationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationModalLabel">예약하기</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="date">날짜</label>
              <input type="date" class="form-control" id="date" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" onclick="makeReservation()">예약 완료</button>
        </div>
      </div>
    </div>
  </div>
                        `;
  document.querySelector('section').innerHTML = simanidata;
  return;
}
