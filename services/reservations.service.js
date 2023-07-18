const ReservationRepository = require('../repositories/reservations.repository');

class Returns {
  constructor(message) {
    this.message = message;
  }

  status200() {
    return {
      status: 200,
      message: `${this.message}에 성공하였습니다.`,
    };
  }
  status400() {
    return {
      status: 400,
      message: `${this.message}에 실패하였습니다.`,
    };
  }
}

class ReservationService {
  reservationRepository = new ReservationRepository();

  createOneReservation = async (petsitter_id, reservationAt, user_id) => {
    const returns = new Returns('예약 작성');
    try {
      if (!petsitter_id || !reservationAt || !user_id) {
        return returns.status400();
      }
      const reservation = await this.reservationRepository.createOneReservation(
        petsitter_id,
        reservationAt,
        user_id,
      );
      if (reservation[1]) {
        return returns.status200();
      } else if (!reservation[1]) {
        return returns.status400();
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  viewAllReservations = async user_id => {
    const returns = new Returns('예약 조회');
    const reservations = await this.reservationRepository.viewAllReservations(
      user_id,
    );
    try {
      if (!reservations[0]) {
        return {
          status: 200,
          message: '예약이 없습니다. 첫 예약을 진행해 주세요.',
        };
      } else if (reservations) {
        const showreservations = reservations.map(reservation => {
          return {
            reservation_id: reservation.reservation_id,
            user_nickname: reservation.User.nickname,
            petsitter_name: reservation.Petsitter.name,
            reservationAt: reservation.reservationAt,
          };
        });
        return {
          status: 200,
          message: returns.status200(),
          reservations: showreservations,
        };
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  adminViewReservations = async user_id => {
    const returns = new Returns('관리자 예약 조회');
    const reservations = await this.reservationRepository.adminViewReservations(
      user_id,
    );
    try {
      if (reservations) {
        return {
          status: 200,
          message: '관리자 예약 조회에 성공하였습니다.',
          reservations,
        };
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  updateOneReservation = async (
    user_id,
    petsitter_id,
    reservationAt,
    reservation_id,
  ) => {
    const returns = new Returns('예약 수정');
    try {
      if (!petsitter_id || !reservationAt || !user_id || !reservation_id) {
        return returns.status400();
      }
      const reservation = await this.reservationRepository.updateOneReservation(
        user_id,
        petsitter_id,
        reservationAt,
        reservation_id,
      );
      if (reservation) {
        return returns.status200();
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  deleteOneReservation = async (user_id, reservation_id) => {
    const returns = new Returns('예약 삭제');
    try {
      if (!user_id || !reservation_id) {
        return returns.status400();
      }
      const reservation = await this.reservationRepository.deleteOneReservation(
        user_id,
        reservation_id,
      );
      if (reservation) {
        return returns.status200();
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  permenantDeleteReservation = async (user_id, reservation_id) => {
    const returns = new Returns('예약 영구 삭제');
    try {
      if (user_id !== 1 || !reservation_id) {
        return returns.status400();
      }
      const reservation =
        await this.reservationRepository.permenantDeleteReservation(
          reservation_id,
        );
      if (reservation) {
        return returns.status200();
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
}

module.exports = ReservationService;
