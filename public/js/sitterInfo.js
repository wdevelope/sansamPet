simani();

async function makeReservation() {
  localStorage.setItem('clickedPetsitter', '1');
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
    `http://localhost:3000/api/petsitters/:${petsitterId}`,
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
                                    </div>
                                </div>
                                <button class="btn btn-success">리뷰 작성</button>
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
                        `;
  document.querySelector('section').innerHTML = simanidata;
  return;
}
