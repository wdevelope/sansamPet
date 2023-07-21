//./js/reviews.js
petsitterId = Number(localStorage.getItem('clickedPetsitter'));
listOfReviews(petsitterId);
function logo() {
  location.href = 'http://localhost:3000';
}
// 붙여넣기
async function listOfReviews(petsitterId) {
  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/reviews`,
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
  const reviews = result.allPost
    .map(review => {
      let star_repeat = '⭐️'.repeat(review.star);
      return `<div class = "shadedBox">
    <p id ="reviewtitle">${review.User.nickname}님의 예약 번호 ${
      review.reservationId
    } 번에 대한 리뷰입니다. </p>
    <p id ="reviewcontent">${review.content}</p>
    <p>${star_repeat}</p>
    <p>작성 : ${review.createdAt.split('T')[0]}</p>
    <p>수정 : ${review.updatedAt.split('T')[0]}</p>
    <br>
    <button id="reviewBtn" onClick="reviewHideController(${petsitterId},${Number(
      review.reviewId,
    )})">리뷰삭제</button>
    <button type="button" id="reviewBtn" data-toggle="modal"
    data-target="#loginModal">
    리뷰수정
  </button>
  </div>
    <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog"  role="document">
      <div class="modal-content" >
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">리뷰 수정하기</h5>
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
          <input id = "reviewcontent${
            review.reviewId
          }" placeholder="리뷰 내용 수정"></input>
          <br><br>
                      <label>별점</label>
                      <select class="form-select" id="reviewstar">
                        <option selected>-- 선택하기 --</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                      </select>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" id="reviewBtn" onclick="reviewUpdateController(${petsitterId},${
            review.reviewId
          })">
            수정
          </button>
        </div>
      </div>
    </div>
  </div>
  <div><br></div>
  `;
    })
    .join('');
  document.querySelector('#reviewsList').innerHTML = reviews;
  return;
}

//  생성
async function reviewCreate(petsitterId) {
  petsitterId = Number(localStorage.getItem('clickedPetsitter'));
  const reservationId = document.querySelector('#reservationId').value;
  const content = document.querySelector('#content').value;
  const star = document.querySelector('#star').value;

  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/review/${reservationId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ content, star }),
    },
  );
  const result = await response.json();
  listOfReviews(petsitterId);
  location.reload();
  return alert(result.message);
}

//  수정
async function reviewUpdateController(petsitterId, reviewId) {
  petsitterId = Number(localStorage.getItem('clickedPetsitter'));
  const reviewcontent = document.querySelector(
    `#reviewcontent${reviewId}`,
  ).value;
  const star = document.querySelector('#reviewstar').value;
  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/review/${reviewId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
      body: JSON.stringify({ content: reviewcontent, star }),
    },
  );
  const result = await response.json();
  location.reload();
  return alert(result.message);
}

//  삭제 ( 가리기 )
async function reviewHideController(petsitterId, reviewId) {
  petsitterId = Number(localStorage.getItem('clickedPetsitter'));
  if (!confirm('진짜로 삭제하시겠습니까?')) {
    alert('삭제가 취소되었습니다.');
    return false;
  }

  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/reviewHide/${reviewId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('Authorization'),
      },
    },
  );
  const result = await response.json();
  location.reload();
  listOfReviews(petsitterId);
  return alert(result.message);
}

async function onPageLoad() {
  await getNonReviewedreservationId();
}

document.addEventListener('DOMContentLoaded', onPageLoad);

async function getNonReviewedreservationId() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/petsitters/${petsitterId}/nonReservation`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('Authorization'),
        },
      },
    );

    const result = await response.json();
    const reviews = result.allPost;
    const resultContents = result.allPost
      .map(item => `<option value="${item}">${item}</option>`)
      .join('');
    document.querySelector('#reservationId').innerHTML = resultContents;
    return;
  } catch (error) {
    console.error('불러오기 실패:', error.message);
  }
}
