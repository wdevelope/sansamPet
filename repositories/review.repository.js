const { Reviews, Users, Petsitters } = require('../models');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');
const { Op } = require('sequelize');

class ReviewsRepositories {
  reviewPostRepository = async (
    content,
    petsitterId,
    star,
    reservationId,
    userId,
  ) => {
    console.log('게시시작');
    // try {
    const isExist = await Reviews.findOne({
      where: {
        userId: userId,
        petsitterId: petsitterId,
        reservationId: reservationId,
        deletedAt: null,
      },
    });
    if (isExist) {
      // 이미 리뷰가 존재하는 경우에 대한 처리
      throw { message: '이미 리뷰를 작성한 예약입니다.' };
    } else {
      // 리뷰가 없는 경우에만 리뷰 생성
      const post = await Reviews.create({
        content,
        userId,
        reservationId,
        petsitterId,
        star,
        deletedAt: null,
      });
      console.log('게시성공');
      return post;
    }
    // } catch (error) {
    //   console.error('게시 실패:', error.message);
    //   throw error; // 올바른 오류 핸들링을 위해 오류를 다시 던집니다.
    // }
    // }
  };

  getAllReviewRepository = async petsitterId => {
    console.log('불러오기 시작');
    try {
      const reviews = await Reviews.findAll({
        attributes: [
          'content',
          'userId',
          'createdAt',
          'updatedAt',
          'star',
          'reservationId',
          'reviewId',
        ],
        include: [
          {
            model: Users,
            attributes: ['nickname'],
          },
          {
            model: Petsitters,
            attributes: ['name'],
          },
        ],
        where: { petsitterId, deletedAt: null },
        order: [['createdAt', 'DESC']],
      });
      console.log('리뷰 목록 불러오기 성공');

      const notReviewedList = await Reviews.findAll({
        attributes: [
          'content',
          'userId',
          'createdAt',
          'updatedAt',
          'star',
          'reservationId',
          'reviewId',
        ],
        include: [
          {
            model: Users,
            attributes: ['nickname'],
          },
          {
            model: Petsitters,
            attributes: ['name'],
          },
        ],
        where: { petsitterId, deletedAt: null },
        order: [['createdAt', 'DESC']],
      });
      console.log('리뷰 목록 불러오기 성공');
      return reviews;
    } catch (error) {
      console.error('불러오기 실패:', error.message);
      throw error;
    }
  };

  getAllReviewRepositoryAll = async () => {
    console.log('불러오기 시작');
    try {
      const reviews = await Reviews.findAll({
        include: [
          {
            model: Users,
            attributes: ['nickname'],
          },
          {
            model: Petsitters,
            attributes: ['name'],
          },
        ],
        order: [['createdAt', 'DESC']],
      });
      console.log('리뷰 목록 불러오기 성공');

      return reviews;
    } catch (error) {
      console.error('불러오기 실패:', error.message);
      throw error;
    }
  };

  // // 쿼리 문법을 직접 입력해서 가져온다.
  // const post = await sequelize.query(
  //   `SELECT * FROM sansam.Reviews LIMIT 30;`,
  //   { type: QueryTypes.SELECT },
  // );
  // // 내보낸다.
  // return post;

  // 리뷰 안된 예약 불러오기

  getNoneBookedReviewServiceRepository = async (petsitterId, userId) => {
    console.log('예약된 것 부터 불러오기 시작', petsitterId, userId);
    try {
      const filteredReivews = await sequelize.query(
        `SELECT DISTINCT r.reservationId, COUNT(v.reviewId) AS "reviewData", COUNT(v.deletedAt) AS "reviewDeleted"
        FROM Reservations AS r
        LEFT JOIN Reviews as v on r.reservationId = v.reservationId 
            WHERE r.petsitterId = :petsitterId AND r.userId = :userId AND r.deletedAt IS NULL 
            GROUP BY r.reservationId
            ORDER BY r.reservationId`,
        {
          replacements: { petsitterId: petsitterId, userId: userId },
          type: QueryTypes.SELECT,
        },
      );

      return filteredReivews;
    } catch (error) {
      console.error('불러오기 실패:', error);
      throw error;
    }
  };

  reviewUpdateRepository = async (content, userId, reviewId, star) => {
    const post = await Reviews.update(
      {
        userId,
        content,
        reviewId,
        star,
      },
      { where: { reviewId } },
    );
    // 내보낸다.
    return post;
  };

  reviewHideRepository = async (userId, reviewId) => {
    const post = await Reviews.update(
      {
        deletedAt: Date.now(),
      },
      { where: { reviewId } },
    );
    // 내보낸다.
    return post;
  };

  reviewDeleteRepository = async reviewId => {
    const post = await Reviews.destroy({ where: { reviewId } });
    // 내보낸다.
    return post;
  };
}
module.exports = ReviewsRepositories;
