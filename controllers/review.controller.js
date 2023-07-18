const ReviewsService = require('../services/review.service');

class ReviewsController {
  reviewsService = new ReviewsService();

  reviewPostController = async (req, res) => {
    const { content, star } = req.body;
    const { petsitterId, reservationId } = req.params;
    // 로그인 기능 완성되면 로컬에서 가져오기, 예약번호는 파람으로 가져와도 될 듯하다.
    // const { userID, reservationId } = res.locals;
    const { status, message } = await this.reviewsService.reviewPostService(
      content,
      petsitterId,
      star,
      reservationId,
    );
    return res.status(status).json({ message });
  };

  getAllReviewController = async (req, res) => {
    const { status, message, allPost } =
      await this.reviewsService.getAllReviewService();
    return res.status(status).json({ message, allPost });
  };

  reviewUpdate = async (req, res) => {
    const { content, userID, star, isDelete } = req.body;
    const { reviewId } = req.params;
    const { status, message } = await this.reviewsService.reviewUpdateService(
      content,
      userID,
      reviewId,
      star,
      isDelete,
    );
    return res.status(status).json({ message });
  };

  reviewDeleteReal = async (req, res) => {
    const { userID } = req.body;
    // 정말 삭제 할 것인지 confirm을 띄워서 isDelete의 값을 만든다.
    const { isDelete } = req.body;
    const { reviewId } = req.params;
    const { status, message } =
      await this.reviewsService.reviewDeleteRealService(
        isDelete,
        reviewId,
        userID,
      );
    return res.status(status).json({ message });
  };
}

module.exports = ReviewsController;
