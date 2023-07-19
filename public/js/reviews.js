//./js/reviews.js
const petsitterId = localStorage.getItem('clickedPetsitter');

// 바로 실행
listOfReviews(petsitterId);

// 붙여넣기
async function listOfReviews(petsitterId) {
  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/reviews`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const result = await response.json();
  console.log(result);
  const reviews = result.allPost
    .map(review => {
      console.log(petsitterId);
      console.log(review.reviewId);
      return `<div>
    <p style="display:none;">시터번호 : ${petsitterId}</p>
    <div class='line2'>
    <p>${review.userId} 회원님의 ${
      review.reservationId
    } 번 서비스 리뷰입니다. </p>
    </div>
    <p>리뷰내용 : ${review.content}</p>
    <p>별★점☆ : ${review.star}</p>
    <div class='line2'>
    <p>작성날짜 : ${review.createdAt.split('T')[0]}</p>
    <p>수정날짜 : ${review.updatedAt.split('T')[0]}</p>
    </div>

    <button class="btn btn-success" id="reviewCreate" onClick="reviewDelete(${petsitterId},${
      review.reviewId
    })">리뷰삭제</button>
    <button type="button" id="resvBtn" data-toggle="modal"
    data-target="#loginModal">
    수정
  </button>
    <div
    class="modal fade"
    id="loginModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" class="shadedBox" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">로그인</h5>
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
          <input id = "reviewcontent" placeholder="리뷰 내용 수정"></input>
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
          <button type="button" class="btn btn-primary" onclick="reviewUpdate(${petsitterId},${
            review.reviewId
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
  console.log(reviews);
  document.querySelector('#reviewsList').innerHTML = reviews;
  return;
}

//  생성
async function reviewCreate(petsitterId, reviewId) {
  console.log('리뷰게시 시작함');
  //입력받아야하지만 일단 설정

  let content = $('#content').val();
  let star = $('#star').val();

  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/review/${reviewId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, star }),
    },
  );
  console.log('POST 요청 시도함');
  const result = await response.json();
  location.reload();
  return alert(result.message);
}

//  수정
async function reviewUpdate(petsitterId, reviewId) {
  console.log('리뷰수정 시작함');
  const content = document.querySelector('#reviewcontent').value;
  const star = document.querySelector('#reviewstar').value;
  console.log('선언함');
  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/review/${reservationId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, star }),
    },
  );
  console.log('PATCH 요청 성공함');

  console.log('response :', response);
  const result = await response.json();
  location.reload();
  return alert(result.message);
}

//  삭제
async function reviewDelete(petsitterId, reviewId) {
  if (!confirm('진짜로 삭제하시겠습니까?')) {
    alert('삭제가 취소되었습니다.');
    return false;
  }

  const response = await fetch(
    `http://localhost:3000/api/petsitters/${petsitterId}/review/${reviewId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  console.log('DELETE 요청 시도함');
  const result = await response.json();
  location.reload();
  return alert(result.message);
}
