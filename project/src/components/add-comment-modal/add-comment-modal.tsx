import { Dispatch, FormEvent, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import { RemoveScroll } from 'react-remove-scroll';
import { isEscKey } from '../../utils/utils';
import { Rating } from '../../const';
import { useAppDispatch } from '../../hooks';
import { postUserComment } from '../../store/api-actions';
import { CommentPost } from '../../types/comment-post';
import './add-comment-modal.css';

type AddCommentModalProps = {
  setModalIsVisible: Dispatch<SetStateAction<boolean>>,
  setModalSuccessVisible: Dispatch<SetStateAction<boolean>>,
  productName: string,
  productId: number,
}

function AddCommentModal({ setModalIsVisible, setModalSuccessVisible, productName, productId }: AddCommentModalProps): JSX.Element {
  const dispatch = useAppDispatch();
  const nameRef = useRef<HTMLInputElement | null>(null);
  const advantagesRef = useRef<HTMLInputElement | null>(null);
  const disadvantagesRef = useRef<HTMLInputElement | null>(null);
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [ rating, setRating ] = useState<number | null>(null);
  const [ dynamicRating, setDynamicRating ] = useState<number | null>(null);

  const [ isNameValid, setNameValid ] = useState(true);
  const [ isAdvantagesValid, setAdvantagesValid ] = useState(true);
  const [ isDisadvantagesValid, setDisadvantagesValid ] = useState(true);
  const [ isCommentValid, setCommentValid ] = useState(true);
  const [ isRatingValid, setRatingValid ] = useState(true);

  const onRatingHover = (event: React.MouseEvent<HTMLLabelElement, MouseEvent>) => {
    if (event.currentTarget.dataset.id){
      setDynamicRating(+event.currentTarget.dataset.id);
    }
  };

  const onRatingLeave = () => setDynamicRating(null);

  const getRatingLabelClass = (currentRating: number) => {
    if (dynamicRating !== null) {
      return dynamicRating >= currentRating ? 'rate__label rate__label--full' : 'rate__label';
    } else if (rating) {
      return rating >= currentRating ? 'rate__label rate__label--full' : 'rate__label';
    } else {
      return 'rate__label';
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', documentKeyDownHandler);
    document.querySelector('.modal__overlay')?.addEventListener('click', () => setModalIsVisible(false));
    return () => {
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
  });

  const validateTextInputs = (ref: React.MutableRefObject<HTMLInputElement | HTMLTextAreaElement | null>, setState: Dispatch<SetStateAction<boolean>>) => {
    if(!ref.current || ref.current.value.length === 0) {
      setState(false);
    } else {
      setState(true);
    }
  };

  const validateRating = () => {
    if (!rating) {
      setRatingValid(false);
    } else {
      setRatingValid(true);
    }
  };

  const ratingData = [];
  for (const rate of Rating) {
    ratingData.push({
      ratingCount: rate[0],
      ratingTitle: rate[1],
    });
  }

  const documentKeyDownHandler = (event: KeyboardEvent) => {
    if (isEscKey(event)) {
      setModalIsVisible(false);
    }
  };

  const onSubmit = (data: CommentPost) => {
    dispatch(postUserComment(data));
  };

  const showSuccessMessage = () => {
    setModalIsVisible(false);
    setModalSuccessVisible(true);
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    validateTextInputs(nameRef, setNameValid);
    validateTextInputs(advantagesRef, setAdvantagesValid);
    validateTextInputs(disadvantagesRef, setDisadvantagesValid);
    validateTextInputs(commentRef, setCommentValid);
    validateRating();

    if (
      nameRef.current !== null && nameRef.current.value.length !== 0 &&
      advantagesRef.current !== null && advantagesRef.current.value.length !== 0 &&
      disadvantagesRef.current !== null && disadvantagesRef.current.value.length !== 0 &&
      commentRef.current !== null && commentRef.current.value.length !== 0 &&
      rating !== null
    ) {
      onSubmit({
        commentData: {
          guitarId: productId,
          userName: nameRef.current.value,
          advantage: advantagesRef.current.value,
          disadvantage: disadvantagesRef.current.value,
          comment: commentRef.current.value,
          rating,
        },
        onSuccess: showSuccessMessage,
      });
    }
  };

  return (
    <RemoveScroll>
      <FocusLock>
        <div className="add-comment-modal">
          <div className="modal is-active modal--review">
            <div className="modal__wrapper">
              <div className="modal__overlay" data-close-modal></div>
              <div className="modal__content">
                <h2 className="modal__header modal__header--review title title--medium">???????????????? ??????????</h2>
                <h3 className="modal__product-name title title--medium-20 title--uppercase">{productName}</h3>
                <form onSubmit={handleFormSubmit} className="form-review">
                  <div className="form-review__wrapper">

                    <div className="form-review__name-wrapper">
                      <label className="form-review__label form-review__label--required" htmlFor="user-name">???????? ??????</label>
                      <input
                        onChange={() => validateTextInputs(nameRef, setNameValid)}
                        ref={nameRef}
                        className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off"
                      />
                      <p
                        className={ isNameValid ? 'form-review__warning form-review__warning--disabled' : 'form-review__warning'}
                      >
                        ?????????????????? ????????
                      </p>
                    </div>

                    <div>
                      <span className="form-review__label form-review__label--required">???????? ????????????</span>
                      <div className="rate rate--reverse">
                        {
                          ratingData.map( (ratingItem) => (
                            <Fragment key={ratingItem.ratingTitle}>
                              <input
                                onChange={(evt) => {
                                  setRating(+evt.target.value);
                                  setRatingValid(true);
                                }}
                                className="visually-hidden"
                                id={`star-${ratingItem.ratingCount}`}
                                name="rate"
                                type="radio"
                                value={ratingItem.ratingCount}
                              />
                              <label
                                className={ getRatingLabelClass(ratingItem.ratingCount) }
                                data-id={ratingItem.ratingCount}
                                htmlFor={`star-${ratingItem.ratingCount}`} title={ratingItem.ratingTitle}
                                onMouseEnter={(evt) => onRatingHover(evt)}
                                onMouseLeave={onRatingLeave}
                              >
                              </label>
                            </Fragment>
                          ),
                          )
                        }
                        <p className={ isRatingValid ? 'rate__message form-review__warning--disabled' : 'rate__message'}>?????????????????? ????????????</p>
                      </div>
                    </div>
                  </div>

                  <label className="form-review__label form-review__label--required" htmlFor="advant">??????????????????????</label>
                  <input
                    onChange={() => validateTextInputs(advantagesRef, setAdvantagesValid)}
                    ref={advantagesRef}
                    className="form-review__input"
                    id="advant" type="text"
                    autoComplete="off"
                  />
                  <p className={ isAdvantagesValid ? 'form-review__warning form-review__warning--disabled' : 'form-review__warning'}>?????????????????? ????????</p>

                  <label className="form-review__label form-review__label--required" htmlFor="disadv">????????????????????</label>
                  <input
                    onChange={() => validateTextInputs(disadvantagesRef, setDisadvantagesValid)}
                    ref={disadvantagesRef}
                    className="form-review__input"
                    id="disadv"
                    type="text"
                    autoComplete="off"
                  />
                  <p className={ isDisadvantagesValid ? 'form-review__warning form-review__warning--disabled' : 'form-review__warning'}>?????????????????? ????????</p>

                  <label className="form-review__label form-review__label--required" htmlFor="comment">??????????????????????</label>
                  <textarea
                    onChange={() => validateTextInputs(commentRef, setCommentValid)}
                    ref={commentRef} className="form-review__input form-review__input--textarea"
                    id="comment"
                    rows={10}
                    autoComplete="off"
                  >
                  </textarea>
                  <p className={isCommentValid ? 'form-review__warning form-review__warning--disabled' : 'form-review__warning'}>?????????????????? ????????</p>

                  <button className="button button--medium-20 form-review__button" type="submit">?????????????????? ??????????</button>
                </form>

                <button
                  onClick={() => setModalIsVisible(false)}
                  className="modal__close-btn button-cross"
                  type="button" aria-label="??????????????"
                >
                  <span className="button-cross__icon"></span>
                  <span className="modal__close-btn-interactive-area"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </FocusLock>
    </RemoveScroll>
  );
}

export default AddCommentModal;

