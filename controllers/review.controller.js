const ReviewsService = require('../services/review.service');

class ReviewsController {
  reviewsService = new ReviewsService();

  reviewPostController = async (req, res) => {
    const { content, star } = req.body;
    const { petsitter_id, reservation_id } = req.params;
    // 로그인 기능 완성되면 로컬에서 가져오기, 예약번호는 파람으로 가져와도 될 듯하다.
    // const { user_id, reservation_id } = res.locals;
    const { status, message } = await this.reviewsService.reviewPostService(
      content,
      petsitter_id,
      star,
      reservation_id,
    );
    return res.status(status).json({ message });
  };

  getAllReviewController = async (req, res) => {
    const { status, message, allPost } =
      await this.reviewsService.getAllReviewService();
    return res.status(status).json({ message, allPost });
  };

  reviewUpdate = async (req, res) => {
    const { content, user_id, star } = req.body;
    const { review_id } = req.params;
    const { status, message } = await this.reviewsService.reviewUpdateService(
      content,
      user_id,
      review_id,
      star,
    );
    return res.status(status).json({ message });
  };

  reviewDelete = async (req, res) => {
    const { user_id } = req.body;
    // 정말 삭제 할 것인지 confirm을 띄워서 isDelete의 값을 만든다.
    const { isDelete } = req.body;
    const { review_id } = req.params;
    const { status, message } = await this.reviewsService.reviewDeleteService(
      isDelete,
      review_id,
      user_id,
    );
    return res.status(status).json({ message });
  };
}

module.exports = ReviewsController;
