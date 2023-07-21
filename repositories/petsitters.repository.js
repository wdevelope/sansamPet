const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class PetsitterRepository {
  viewallpesitters = async () => {
    const petsitters = await sequelize.query(
      `SELECT p.petsitterId, p.name, p.imgurl, p.description, p.signInCareer, IFNULL(AVG(r.star),0) AS starAvg
      FROM Petsitters AS p
      LEFT JOIN Reviews as r on p.petsitterId = r.petsitterId AND r.deletedAt IS NULL 
          WHERE p.deletedAt IS NULL 
          GROUP BY p.petsitterId 
          ORDER BY starAvg DESC`,
      { type: QueryTypes.SELECT },
    );

    return petsitters;
  };

  viewonepetsitter = async petsitterId => {
    const petsitters = await sequelize.query(
      `SELECT p.petsitterId, p.name, p.imgurl, p.description, p.signInCareer, IFNULL(AVG(r.star),0) AS starAvg
          FROM Petsitters AS p
          LEFT JOIN Reviews as r on p.petsitterId = r.petsitterId AND r.deletedAt IS NULL 
              WHERE p.deletedAt IS NULL AND p.petsitterId = :petsitterId
              `,
      { replacements: { petsitterId }, type: QueryTypes.SELECT },
    );

    return petsitters;
  };

  // 심마니 검색
  viewonepetsitterbynickname = async name => {
    const petsitters = await sequelize.query(
      `SELECT p.name, p.imgurl, p.description, p.signInCareer, IFNULL(AVG(r.star),0) AS starAvg
          FROM Petsitters AS p
          LEFT JOIN Reviews as r on p.petsitterId = r.petsitterId 
              WHERE p.deletedAt IS NULL AND p.name = :name 
              GROUP BY p.petsitterId 
              ORDER BY starAvg DESC`,
      { replacements: { name }, type: QueryTypes.SELECT },
    );

    return petsitters;
  };
}
module.exports = PetsitterRepository;
