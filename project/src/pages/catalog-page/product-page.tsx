import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NameSpace } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchGuitarDataAction } from '../../store/api-actions';
import { getPreviewImage, getFormattedPrice } from '../../utils/utils';
import { ratingStarSizeBigger } from '../../const';
import RatingStars from '../../components/rating-stars/rating-stars';
import Comments from '../../components/comments/comments';
import Tabs from '../../components/tabs/tabs';
import AddCommentModal from '../../components/add-comment-modal/add-comment-modal';
import CommentSentModal from '../../components/comment-sent-modal/comment-sent-modal';

function ProductPage(): JSX.Element | null {
  const pathParams = useParams();
  const dispatch = useAppDispatch();
  const [ commentModalIsVisible, setCommentModalVisible ] = useState(false);
  const [ modalSuccessIsVisible, setModalSuccessVisible ] = useState(false);

  const { guitar } = useAppSelector((state) => state[NameSpace.guitars].currentGuitarData);

  const guitarId = pathParams.id;

  useEffect(() => {
    if (guitarId) {
      dispatch(fetchGuitarDataAction(guitarId));
    }
  }, [guitarId, dispatch]);

  if (!guitar) {
    return null;
  }

  const { previewImg, name, rating, vendorCode, type: guitarType, stringCount, price, description, id } = guitar;
  const guitarImage = getPreviewImage(previewImg);
  const guitarPrice = getFormattedPrice(price);

  return (
    <main className="page-content">
      <div className="container">
        <h1 className="page-content__title title title--bigger">{name}</h1>
        <ul className="breadcrumbs page-content__breadcrumbs">
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Главная</a>
          </li>
          <li className="breadcrumbs__item"><a className="link" href="./main.html">Каталог</a>
          </li>
          <li className="breadcrumbs__item"><a className="link">{name}</a>
          </li>
        </ul>
        <div className="product-container">

          <img
            className="product-container__img"
            src={guitarImage.src}
            srcSet={guitarImage.srcSet}
            width="90"
            height="235"
            alt={name}
          />

          <div className="product-container__info-wrapper">
            <h2 className="product-container__title title title--big title--uppercase">{name}</h2>

            <div className="rate product-container__rating">
              <RatingStars
                starSize={ratingStarSizeBigger}
                ratingCount={rating}
              />
              <p className="visually-hidden">Оценка: Хорошо</p>
            </div>

            <Tabs
              vendorCode={vendorCode}
              guitarType={guitarType}
              stringCount={stringCount}
              description={description}
            />

          </div>

          <div className="product-container__price-wrapper">
            <p className="product-container__price-info product-container__price-info--title">Цена:</p>
            <p className="product-container__price-info product-container__price-info--value">{guitarPrice}</p>
            <a className="button button--red button--big product-container__button" href="#">Добавить в корзину</a>
          </div>
        </div>

        <Comments setModalIsVisible={setCommentModalVisible}/>

      </div>
      {
        commentModalIsVisible ?
          <AddCommentModal
            setModalIsVisible={setCommentModalVisible}
            setModalSuccessVisible={setModalSuccessVisible}
            productName={ name }
            productId={ id }
          /> :
          null
      }
      {
        modalSuccessIsVisible ? <CommentSentModal setModalSuccessVisible={setModalSuccessVisible} /> : null
      }
    </main>
  );
}

export default ProductPage;
