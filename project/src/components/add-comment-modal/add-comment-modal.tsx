function AddCommentModal(): JSX.Element {
  return (
    <div style={{position: 'relative', width: '550px', height: '610px', marginBottom: '50px;'}}>
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">СURT Z30 Plus</h3>
            <form className="form-review">
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" />
                  <p className="form-review__warning">Заполните поле</p>
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input className="visually-hidden" id="star-5" name="rate" type="radio" value="5" />
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input className="visually-hidden" id="star-4" name="rate" type="radio" value="4" />
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input className="visually-hidden" id="star-3" name="rate" type="radio" value="3" />
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input className="visually-hidden" id="star-2" name="rate" type="radio" value="2" />
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input className="visually-hidden" id="star-1" name="rate" type="radio" value="1" />
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    <p className="rate__message">Поставьте оценку</p>
                  </div>
                </div>
              </div>
              <label className="form-review__label form-review__label--required" htmlFor="adv">Достоинства</label>
              <input className="form-review__input" id="adv" type="text" autoComplete="off" />
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="disadv">Недостатки</label>
              <input className="form-review__input" id="disadv" type="text" autoComplete="off" />
              <p className="form-review__warning">Заполните поле</p>
              <label className="form-review__label form-review__label--required" htmlFor="comment">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="comment" rows={10} autoComplete="off"></textarea>
              <p className="form-review__warning">Заполните поле</p>
              <button className="button button--medium-20 form-review__button" type="submit">Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть"><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCommentModal;

