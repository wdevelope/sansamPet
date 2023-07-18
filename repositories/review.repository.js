const { Reviews } = require('../models');
const { sequelize } = require('../models');
const { QueryTypes } = require('sequelize');

class ReviewsRepositories {
  reviewPostRepository = async (content, petsitterId, star, reservationId) => {
    console.log('게시시작');
    try {
      const post = await Reviews.create({
        content,
        userID: 1,
        reservationId,
        petsitterId,
        star,
      });
      console.log('게시성공');
      return post;
    } catch (error) {
      console.error('게시 실패:', error.message);
      throw error; // 올바른 오류 핸들링을 위해 오류를 다시 던집니다.
    }
  };

  getAllReviewRepository = async postId => {
    // 쿼리 문법을 직접 입력해서 가져온다.
    const post = await sequelize.query(
      `SELECT * FROM sansam.Reviews LIMIT 30;`,
      { type: QueryTypes.SELECT },
    );
    // 내보낸다.
    return post;
  };

  reviewUpdateRepository = async (
    content,
    userID,
    reviewId,
    star,
    isDelete,
  ) => {
    if (isDelete === true) {
      const post = await Reviews.update(
        {
          isDelete: 1,
        },
        { where: { reviewId } },
      );
      // 내보낸다.
      return post;
    } else {
      const post = await Reviews.update(
        {
          userID,
          content,
          reviewId,
          star,
        },
        { where: { reviewId } },
      );
      // 내보낸다.
      return post;
    }
  };

  reviewDeleteRealRepository = async reviewId => {
    const post = await Reviews.destroy({ where: { reviewId } });
    // 내보낸다.
    return post;
  };
}

module.exports = ReviewsRepositories;
