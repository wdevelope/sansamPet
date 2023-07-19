const ReviewsService = require('../services/review.service');

class ReviewsController {
  reviewsService = new ReviewsService();

  reviewPostController = async (req, res) => {
    const { content, star } = req.body;
    const { petsitterId, reservationId } = req.params;
    // 로그인 기능 완성되면 로컬에서 가져오기, 예약번호는 파람으로 가져와도 될 듯하다.
    // const { userId, reservationId } = res.locals;
    const { status, message } = await this.reviewsService.reviewPostService(
      content,
      petsitterId,
      star,
      reservationId,
    );
    return res.status(status).json({ message });
  };

  getAllReviewController = async (req, res) => {
    const { petsitterId } = req.params;
    const { status, message, allPost } =
      await this.reviewsService.getAllReviewService(petsitterId);
    return res.status(status).json({ message, allPost });
  };

  reviewUpdate = async (req, res) => {
    const { userId } = res.locals;
    const { content, star } = req.body;
    const { reviewId, petsitterId } = req.params;
    const { status, message } = await this.reviewsService.reviewUpdateService(
      content,
      userId,
      reviewId,
      star,
      petsitterId,
    );
    return res.status(status).json({ message });
  };

  reviewDelete = async (req, res) => {
    const { userId } = res.locals;
    const { reviewId, petsitterId } = req.params;
    const { status, message } = await this.reviewsService.reviewDeleteService(
      reviewId,
      userId,
    );
    return res.status(status).json({ message });
  };
}

module.exports = ReviewsController;
