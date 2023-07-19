const ReviewsRepositories = require('../repositories/review.repository');

const { Reviews } = require('../models');

class ReviewsService {
  reviewsRepositories = new ReviewsRepositories();

  reviewPostService = async (content, petsitterId, star, reservationId) => {
    try {
      if (!content || !petsitterId || !star) {
        return {
          status: 400,
          message: '미입력된 항목이 있습니다. 모두 입력하여 주세요.',
        };
      }
      const post = await this.reviewsRepositories.reviewPostRepository(
        content,
        petsitterId,
        star,
        reservationId,
      );
      if (post) {
        return { status: 200, message: '리뷰 작성에 성공하였습니다.' };
      }
    } catch (err) {
      return { status: 400, message: '리뷰 작성에 실패하였습니다.' };
    }
  };

  getAllReviewService = async petsitterId => {
    const allPost = await this.reviewsRepositories.getAllReviewRepository(
      petsitterId,
    );
    if (allPost && !allPost[0]) {
      return {
        status: 200,
        message: '리뷰이 없습니다. 첫 작성자가 되어 주세요.',
        allPost: null,
      };
      // 내용물이 있다면, 성공 메시지.
    } else if (allPost) {
      return { status: 200, message: '리뷰 조회에 성공하였습니다.', allPost };
      // 아니면 실패 메시지
    } else {
      return {
        status: 400,
        message: '리뷰 조회에 실패하였습니다.',
        allPost: null,
      };
    }
  };

  reviewUpdateService = async (
    content,
    userId,
    reviewId,
    star,
    petsitterId,
  ) => {
    // try {
    if (!content || !star) {
      return {
        status: 400,
        message: '미입력된 항목이 있습니다. 모든 항목을 입력해 주세요.',
      };
    }
    const target = await Reviews.findOne({ where: { reviewId, userId } });
    if (!target) {
      return { status: 400, message: '수정 리뷰 조회에 실패하였습니다.' };
    }
    const post = await this.reviewsRepositories.reviewUpdateRepository(
      content,
      userId,
      reviewId,
      star,
    );
    if (post) {
      return { status: 200, message: '리뷰 수정에 성공하였습니다.' };
    } else {
      return { status: 400, message: '리뷰 수정에 실패하였습니다.' };
    }
    // } catch (err) {
    //   return { status: 400, message: '리뷰 수정 실패' };
    // }
  };
  reviewDeleteService = async (reviewId, userId) => {
    try {
      const target = await Reviews.findOne({ where: { reviewId, userId } });
      if (!target) {
        return { status: 400, message: '삭제 리뷰 조회에 실패하였습니다.' };
      }
      const post = await this.reviewsRepositories.reviewDeleteRepository(
        reviewId,
      );
      if (post) {
        return { status: 200, message: ' 삭제에 성공하였습니다.' };
      } else {
        return { status: 400, message: '리뷰 삭제에 실패했습니다.' };
      }
    } catch (err) {
      return { status: 400, message: '리뷰 수정 실패' };
    }
  };
}

module.exports = ReviewsService;
