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

  createOneReservation = async (petsitterId, reservationAt, userId) => {
    const returns = new Returns('예약 작성');
    try {
      if (!petsitterId || !reservationAt || !userId) {
        return returns.status400();
      }
      const reservation = await this.reservationRepository.createOneReservation(
        petsitterId,
        reservationAt,
        userId,
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
  viewAllReservations = async userId => {
    const returns = new Returns('예약 조회');
    const reservations = await this.reservationRepository.viewAllReservations(
      userId,
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
            reservationId: reservation.reservationId,
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
  adminViewReservations = async userId => {
    const returns = new Returns('관리자 예약 조회');
    const reservations = await this.reservationRepository.adminViewReservations(
      userId,
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
    userId,
    petsitterId,
    reservationAt,
    reservationId,
  ) => {
    const returns = new Returns('예약 수정');
    try {
      if (!petsitterId || !reservationAt || !userId || !reservationId) {
        return returns.status400();
      }
      const reservation = await this.reservationRepository.updateOneReservation(
        userId,
        petsitterId,
        reservationAt,
        reservationId,
      );
      if (reservation.petsitterId) {
        return returns.status200();
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  deleteOneReservation = async (userId, reservationId) => {
    const returns = new Returns('예약 삭제');
    try {
      if (!userId || !reservationId) {
        return returns.status400();
      }
      const reservation = await this.reservationRepository.deleteOneReservation(
        userId,
        reservationId,
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
  permenantDeleteReservation = async (userId, reservationId) => {
    const returns = new Returns('예약 영구 삭제');
    try {
      if (userId !== 2 || !reservationId) {
        return returns.status400();
      }
      const reservation =
        await this.reservationRepository.permenantDeleteReservation(
          reservationId,
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
