let petsitterId = Number(localStorage.getItem('clickedPetsitter'));

simani();
sitterReservation();

function logo() {
  location.href = 'http://localhost:3000';
}
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

// 예약 조회 클릭
function clickReservation() {
  location.href = 'http://localhost:3000/reservation.html';
}

async function makeReservation() {
  const reservationAt = document.querySelector('#date').value.substr(0, 10);
  const petsitterId = Number(localStorage.getItem('clickedPetsitter'));
  let reservationDate = new Date(reservationAt);
  reservationDate = reservationDate.getTime();
  let now = new Date();
  now = now.getTime();
  if (reservationDate - now < 0) {
    return alert('오늘 이후로 예약해 주세요!');
  }
  if (2592000000 < reservationDate - now) {
    return alert('오늘로부터 30일 이내로 예약해 주세요!');
  }
  const response = await fetch(`http://localhost:3000/api/reservations`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: sessionStorage.getItem('Authorization'),
    },
    body: JSON.stringify({ reservationAt, petsitterId }),
  });
  const result = await response.json();
  window.location.reload();
  return alert(result.message);
}

async function simani() {
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
  const simani = result.petsitter;
  let star_repeat = '⭐️'.repeat(simani.star);
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
                                  ${star_repeat}
                                    <button class="btn btn-primary" id ="resvBtn" data-toggle="modal" data-target="#reservationModal">
                                    예약하기
                                    </button>
                                </div>
                                <hr />
                                <h6>리뷰 작성</h6>
                                <div class="form-group">
                                    <textarea class="form-control" rows="4" placeholder="리뷰 내용" id="content"></textarea>
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
                                    <label class="input-group-text" for="inputGroupSelect01">예약 번호</label>
                                    <select class="form-select" id="reservationId">
                                      <!-- 예약번호 붙는 곳 -->
                                    </select>
                                    </div>
                                </div>
                                <button class="writereviewBtn" onclick="reviewCreate(${petsitterId})">리뷰 작성</button>
                                </div>
                                <div id="reviewsList">
                                  <!-- 리뷰 붙는 곳 -->
                                </div>
                            </div>
                            </div>
                            <div class="col-md-7">
                            <!-- 예약 현황 div -->
                            <div class="card">
                            <div class='rap'>
                            
                              <div class="header">
                                
                                <h2 class='dateTitle'></h2>
                               
                              </div>
                                <div class="reservationBox">
                                <p id="resvtitle">예약 가능 날짜</p>
                                <div class="guid">
                                <div class="shadedBoxCalendar">O</div>
                                <p>　 예약 가능한 날짜</p>
                                </div>
                                <div class="guid">
                                <div class="shadedBoxCalendarBooked" style="color:white">X</div>
                                <p>　 예약 안 되는 날짜</p>
                                </div>
                                <br>
                             
                              <div class="grid">
                                <div class="shadedBoxCalendar" style="background-color: darkgreen;">일</div>
                                <div class="shadedBoxCalendar" style="background-color: green;">월</div>
                                <div class="shadedBoxCalendar" style="background-color: green;">화</div>
                                <div class="shadedBoxCalendar" style="background-color: green;">수</div>
                                <div class="shadedBoxCalendar" style="background-color: green;">목</div>
                                <div class="shadedBoxCalendar" style="background-color: green;">금</div>
                                <div class="shadedBoxCalendar" style="background-color: darkgreen;">토</div>
                              </div>
                              <br>
                                <!-- 예약 현황 내용 추가 -->
                                <div id = sitterReservation class="grid"></div>
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

async function sitterReservation() {
  const response = await fetch(
    `http://localhost:3000/api/reservations/petsitters/${petsitterId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();
  // console.log(result.message);
  setTimeout(() => {
    const date = new Date();

    const currentYear = new Date(date).getFullYear();
    const currentMonth = new Date(date).getMonth() + 1;
    const day = date.getDate();
    const lastDay = new Date(currentYear, currentMonth, 0).getDate();

    // 오늘의 요일을 0(일)~6(토) 으로 반환
    const today = date.getDay();
    let firstDate = today;

    const firstDay = day;
    const finalDay = firstDay + 30;

    const limitDay = date + finalDay;

    let htmlDummy = '';

    for (let i = 0; i < firstDate; i++) {
      htmlDummy += `<div class="noColor"></div>`;
    }

    for (let i = firstDay; i <= finalDay; i++) {
      let i2 = i;
      let month = currentMonth;
      if (i > lastDay) {
        i2 = i - lastDay;
        month = month + 1;
      }
      htmlDummy += `
    <div class="shadedBoxCalendar" id='${i2}'>${month}/${i2}</div>
    `;
    }

    document.querySelector('#sitterReservation').innerHTML = htmlDummy;

    if (response.status === 200) {
      const reservations = result.reservations;
      for (const reservation of reservations) {
        const reservationAt = new Date(reservation.reservationAt);
        const day = reservationAt.getDate();

        const targetElement = document.querySelector(
          `.shadedBoxCalendar[id='${day}'],.shadedBoxCalendarBooked[id='${day}']`,
        );
        targetElement.className = 'shadedBoxCalendarBooked';
      }
    }
  }, 50);
}
