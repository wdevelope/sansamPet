const SimaniRepository = require('../repositories/simanis.repository');

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

class SimaniService {
  simaniRepository = new SimaniRepository();

  createSimani = async (name, imgurl, signInCareer, description, userId) => {
    const returns = new Returns('심마니 등록');
    try {
      if ((!name, !imgurl, !signInCareer, !description, !userId == 2)) {
        return returns.status400();
      }
      const simani = await this.simaniRepository.createSimani(
        name,
        imgurl,
        signInCareer,
        description,
      );
      if (simani.name) {
        return returns.status200();
      } else if (!simani.name) {
        return returns.status400();
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  viewSimanis = async userId => {
    const returns = new Returns('심마니 조회');
    const simanis = await this.simaniRepository.viewSimanis();

    try {
      if (!simanis[0]) {
        return {
          status: 200,
          message: '심마니가 없습니다. 이게 무슨 일이야 이렇게 좋은 날에.',
        };
      } else if (simanis && userId == 2) {
        return {
          status: 200,
          message: '심마니 조회에 성공하였습니다.',
          simanis,
        };
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };

  editSimani = async (
    name,
    imgurl,
    signInCareer,
    description,
    userId,
    petsitterId,
  ) => {
    const returns = new Returns('심마니 정보 수정');
    try {
      if (
        !name ||
        !imgurl ||
        !signInCareer ||
        !description ||
        !userId ||
        !petsitterId
      ) {
        return returns.status400();
      }
      const reservation = await this.simaniRepository.editSimani(
        userId,
        petsitterId,
        reservationAt,
        reservationId,
      );

      if (reservation[0]) {
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

module.exports = SimaniService;
