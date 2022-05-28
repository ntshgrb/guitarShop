import './not-found.css';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundPage(): JSX.Element {
  const navigate = useNavigate();

  const onButtonClick = () => {
    navigate(AppRoute.Root);
  };

  return (
    <div className="container">
      <div className="notfound__wrapper">
        <h1 className="page-content__title title title--bigger not-found__title">Страница не найдена.</h1>
        <img className="notfound__image" src='../img/notfound.png' width="160px" height="auto" alt='Страница не найдена'/>
        <button
          onClick={onButtonClick}
          type="button"
          className="notfound__button"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage;
