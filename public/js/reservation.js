async function makeReservation() {
  const reservationAt = document.querySelector('#reservationAt').value;
  const content = document.querySelector('#writeContent').value;
  const response = await fetch(`http://localhost:3000/api/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}

// 게시글 수정
async function editReservation() {
  const postId = localStorage.getItem('clickedpost');
  const title = document.querySelector('#editTitle').value;
  const content = document.querySelector('#editContent').value;
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, content }),
  });
  const result = await response.json();
  console.log(result.message);
  window.location.reload();
  return alert(result.message);
}

async function deleteReservationd(postId) {
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const result = await response.json();
  console.log(result.message);
  window.location.href = 'http://localhost:3000/newsfeeds.html';
  return alert(result.message);
}

async function listReservations() {
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
