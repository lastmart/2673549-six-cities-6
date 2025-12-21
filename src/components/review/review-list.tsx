import { useEffect } from 'react';
import ReviewItem from 'components/review/review-item';
import ReviewForm from 'components/review/review-form';
import PrivateComponent from 'components/base/private-component';
import { useAppDispatch, useAppSelector } from 'hooks/index';
import { fetchOfferReviewsAction } from 'store/api-actions';
import { loadOfferReviews } from 'store/action';
import { AuthorizationStatus } from '@constants';

function ReviewList() {
  const dispatch = useAppDispatch();
  const selectedOffer = useAppSelector((state) => state.selectedOffer);
  const isReviewDataPosting = useAppSelector((state) => state.isReviewDataPosting);
  const reviews = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (selectedOffer?.id) {
      dispatch(fetchOfferReviewsAction(selectedOffer?.id));
    }

    return () => {
      dispatch(loadOfferReviews([]));
    };
  }, [dispatch, selectedOffer?.id, isReviewDataPosting]);

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">Reviews &middot;
        <span className="reviews__amount">
          {reviews.length}
        </span>
      </h2>
      <ul className="reviews__list">
        {
          reviews.map((review) => <ReviewItem key={review.id} review={review} />)
        }
      </ul>
      <PrivateComponent restrictedFor={AuthorizationStatus.NoAuth} >
        <ReviewForm />
      </PrivateComponent>
    </section>
  );
}

export default ReviewList;
