simani(petsitterId);
listReservations();

async function makeReservation() {
  const reservationAt = document.querySelector('#reservationAt').value;
  const petsitterId = document.querySelector('#petsitterId').value;
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

async function editReservation(reservationId) {
  const reservationAt = document.querySelecftor('#reservationAt').value;
  const petsitterId = document.querySelector('#petsitterId').value;
  const response = await fetch(
    `http://localhost:3000/api/reservations?reservationId=${reservationId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
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
    },
  });
  const result = await response.json();
  console.log(result.message);
  const reservations = result.reservations
    .map(reservation => {
      return `<div>
                <p>예약 번호: ${reservation.reservationId}</p>
                <p>예약 날짜: ${reservation.reservationAt}</p>
                <p>예약 고객: ${reservation.nickname}</p>
                <p>산삼 시터: ${reservation.name}</p>
              </div>
              `;
    })
    .join('');
  document.querySelector('main').innerHTML = reservations;
  return;
}

async function simani(petsitterId) {
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
  const simanidata = `<div>
                          <img src="${simani.imgurl}"></img>
                          <p>이름: ${simani.name}</p>
                          <p>경력: ${simani.signInCareer}</p>
                          <p>설명: ${simani.description}</p>
                        </div>
                        `;
  document.querySelector('main').innerHTML = simanidata;
  return;
}
