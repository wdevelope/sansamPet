const express = require('express');
const router = express.Router();

const authmiddleware = require('../middlewares/auth-middleware.js');

const ReviewsController = require('../controllers/review.controller.js');
const reviewsController = new ReviewsController();

// 리뷰 작성
router.post(
  '/petsitters/:petsitterId/review/:reservationId',
  authmiddleware,
  reviewsController.reviewPostController,
);

// 심마니의 안가려진 리뷰 조회
router.get(
  '/petsitters/:petsitterId/reviews',
  authmiddleware,
  reviewsController.getAllReviewController,
);

// 심마니의 전체 리뷰 조회
router.get(
  '/petsitters/:petsitterId/reviewsAll',
  reviewsController.getAllReviewControllerAll,
);

// 리뷰 수정
router.patch(
  '/petsitters/:petsitterId/review/:reviewId',
  authmiddleware,
  reviewsController.reviewUpdateController,
);

// 리뷰 삭제 (가리기)
router.patch(
  '/petsitters/:petsitterId/reviewHide/:reviewId',
  authmiddleware,
  reviewsController.reviewHideController,
);

// 리뷰 진짜로 삭제
router.delete(
  '/admin/reviews/:reviewId',
  authmiddleware,
  reviewsController.reviewDeleteController,
);

module.exports = router;
