const ReviewsService = require('../services/review.service');

class ReviewsController {
  reviewsService = new ReviewsService();

  // 리뷰 작성
  reviewPostController = async (req, res) => {
    const { content, star } = req.body;
    const { petsitterId, reservationId } = req.params;
    // 로그인 기능 완성되면 로컬에서 가져오기, 예약번호는 파람으로 가져와도 될 듯하다.
    const { userId } = res.locals;
    const { status, message } = await this.reviewsService.reviewPostService(
      content,
      petsitterId,
      star,
      reservationId,
      userId,
    );
    return res.status(status).json({ message });
  };

  // 리뷰 불러오기
  getAllReviewController = async (req, res) => {
    const { petsitterId } = req.params;
    const { status, message, allPost } =
      await this.reviewsService.getAllReviewService(petsitterId);
    return res.status(status).json({ message, allPost });
  };

  // 리뷰 불러오기전체
  getAllReviewControllerAll = async (req, res) => {
    const { petsitterId } = req.params;
    const { status, message, allPost } =
      await this.reviewsService.getAllReviewServiceAll(petsitterId);
    return res.status(status).json({ message, allPost });
  };

  // 리뷰 업데이트
  reviewUpdateController = async (req, res) => {
    const { userId } = res.locals;
    const { content, star } = req.body;
    let { reviewId, petsitterId } = req.params;
    reviewId = Number(reviewId);
    const { status, message } = await this.reviewsService.reviewUpdateService(
      content,
      userId,
      reviewId,
      star,
      petsitterId,
    );
    return res.status(status).json({ message });
  };

  // 리뷰 삭제 (가리기)
  reviewHideController = async (req, res) => {
    const { userId } = res.locals;
    const { reviewId } = req.params;
    const { status, message } = await this.reviewsService.reviewHideService(
      userId,
      reviewId,
    );
    return res.status(status).json({ message });
  };

  // 리뷰 진짜로 삭제
  reviewDeleteController = async (req, res) => {
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
