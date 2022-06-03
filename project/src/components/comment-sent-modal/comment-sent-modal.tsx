import { Dispatch, SetStateAction, useEffect } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import FocusLock from 'react-focus-lock';
import { isEscKey } from '../../utils/utils';
import './comment-sent-modal.css';

type CommentSentModalProps = {
  setModalSuccessVisible: Dispatch<SetStateAction<boolean>>,
}

function CommentSentModal({ setModalSuccessVisible }: CommentSentModalProps): JSX.Element {
  const documentKeyDownHandler = (event: KeyboardEvent) => {
    if (isEscKey(event)) {
      setModalSuccessVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', documentKeyDownHandler);
    document.querySelector('.modal__overlay')?.addEventListener('click', () => setModalSuccessVisible(false));
    return () => {
      document.removeEventListener('keydown', documentKeyDownHandler);
    };
  });

  return (
    <RemoveScroll>
      <FocusLock>
        <div className="comment-sent-modal">
          <div className="modal is-active modal--success modal-for-ui-kit">
            <div className="modal__wrapper">
              <div className="modal__overlay" data-close-modal></div>
              <div className="modal__content">
                <svg className="modal__icon" width="26" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-success"></use>
                </svg>
                <p className="modal__message">Спасибо за ваш отзыв!</p>
                <div className="modal__button-container modal__button-container--review">
                  <button onClick={() => setModalSuccessVisible(false)} className="button button--small modal__button modal__button--review">К покупкам!</button>
                </div>
                <button onClick={() => setModalSuccessVisible(false)} className="modal__close-btn button-cross" type="button" aria-label="Закрыть">
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

export default CommentSentModal;
