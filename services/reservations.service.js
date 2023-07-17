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
      if (reservation) {
        return returns.status200();
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
    if (reservations[0].reservation_id) {
      return {
        status: 200,
        message: returns.status200(),
        reservations: {
          user_nickname: reservations[0].User.nickname,
          petsitter_name: reservations[0].Petsitter.name,
          reservationAt: reservations[0].reservationAt,
        },
      };
    } else if (reservations && !reservations[0].reservation_id) {
      return {
        status: 200,
        message: '예약이 없습니다. 첫 예약을 진행해 주세요.',
      };
    } else {
      return returns.status400();
    }
  };
}

module.exports = ReservationService;
