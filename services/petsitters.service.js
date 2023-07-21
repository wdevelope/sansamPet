const PetsitterRepository = require('../repositories/petsitters.repository');

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

class PetsitterService {
  petsitterRepository = new PetsitterRepository();

  viewallpesitters = async () => {
    const returns = new Returns('펫시터 전체 조회');
    const petsitters = await this.petsitterRepository.viewallpesitters();

    try {
      if (!petsitters[0]) {
        return {
          status: 200,
          message: '등록된 펫시터가 없습니다.',
        };
      } else if (petsitters) {
        const showpetsitters = petsitters.map(petsitter => {
          const career = petsitter.signInCareer;
          const now = new Date();
          return {
            petsitterId: petsitter.petsitterId,
            name: petsitter.name,
            imgurl: petsitter.imgurl,
            description: petsitter.description,
            signInCareer: Math.floor(
              (now.getTime() - career.getTime()) / (1000 * 60 * 60 * 24),
            ),
            star: Math.floor(petsitter.starAvg),
          };
        });

        return {
          status: 200,
          message: '산삼 시터 조회에 성공하였습니다.',
          petsitters: showpetsitters,
        };
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
  viewonepetsitter = async petsitterId => {
    const returns = new Returns('펫시터 개별 조회');
    const petsitter = await this.petsitterRepository.viewonepetsitter(
      petsitterId,
    );

    try {
      if (!petsitter[0].name) {
        return returns.status400();
      } else if (petsitter) {
        const career = petsitter[0].signInCareer;
        const now = new Date();
        const showpetsitter = {
          petsitterId: petsitter[0].petsitterId,
          name: petsitter[0].name,
          imgurl: petsitter[0].imgurl,
          description: petsitter[0].description,
          signInCareer: Math.floor(
            (now.getTime() - career.getTime()) / (1000 * 60 * 60 * 24),
          ),
          star: Math.floor(petsitter[0].starAvg),
        };

        return {
          status: 200,
          message: '산삼 시터 개별 조회에 성공하였습니다.',
          petsitter: showpetsitter,
        };
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };

  viewonepetsitterbynickname = async name => {
    const returns = new Returns('펫시터 검색');
    const petsitter = await this.petsitterRepository.viewonepetsitterbynickname(
      name,
    );

    try {
      if (!petsitter[0].name) {
        return returns.status400();
      } else if (petsitter) {
        const career = petsitter[0].signInCareer;
        const now = new Date();
        const showpetsitter = {
          petsitterId: petsitter[0].petsitterId,
          name: petsitter[0].name,
          imgurl: petsitter[0].imgurl,
          description: petsitter[0].description,
          signInCareer: Math.floor(
            (now.getTime() - career.getTime()) / (1000 * 60 * 60 * 24),
          ),
          star: Math.floor(petsitter[0].starAvg),
        };

        return {
          status: 200,
          message: '산삼 시터 검색에 성공하였습니다.',
          petsitter: showpetsitter,
        };
      } else {
        return returns.status400();
      }
    } catch (err) {
      return returns.status400();
    }
  };
}
module.exports = PetsitterService;
