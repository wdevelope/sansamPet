const express = require('express');
const router = express.Router();

const authmiddleware = require('../middlewares/auth-middleware.js');

const ReviewsController = require('../controllers/review.controller.js');
const reviewsController = new ReviewsController();

// 리뷰 작성
router.post(
  '/petsitters/:petsitterId/review/:reservationId',
  reviewsController.reviewPostController,
);

// 모든 리뷰 조회
router.get('/petsitters', reviewsController.getAllReviewController);

// 리뷰 수정
router.patch(
  '/petsitters/:petsitterId/review/:reviewId',
  reviewsController.reviewUpdate,
);

// 리뷰 삭제
router.delete(
  '/petsitters/:petsitterId/review/:reviewId',
  reviewsController.reviewDelete,
);

module.exports = router;
