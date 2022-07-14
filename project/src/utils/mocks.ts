import { Guitar } from '../types/guitar';
import { datatype } from 'faker';
import { UserComment } from '../types/comment';
import { CommentPost } from '../types/comment-post';
import { CartItem } from '../types/cart-item';

export const makeFakeGuitar = (): Guitar => ({
  id: datatype.number(),
  name: datatype.string(),
  vendorCode: datatype.string(),
  type: datatype.string(),
  description: datatype.string(),
  previewImg: datatype.string(),
  stringCount: datatype.number(),
  rating: datatype.number(),
  price: datatype.number(),
});

export const makeFakeComment = (): UserComment => ({
  id: datatype.string(),
  userName: datatype.string(),
  advantage: datatype.string(),
  disadvantage: datatype.string(),
  comment: datatype.string(),
  rating: datatype.number(),
  createAt: datatype.string(),
  guitarId: datatype.number(),
});

export const createCommentPost = (): CommentPost => ({
  commentData: {
    guitarId: datatype.number(),
    userName: datatype.string(),
    advantage: datatype.string(),
    disadvantage: datatype.string(),
    comment: datatype.string(),
    rating: datatype.number(),
  },
  onSuccess: jest.fn(),
});

export const makeFakeCartItem = (): CartItem => ({
  id: datatype.number(),
  product: makeFakeGuitar(),
  quantity: datatype.number(),
});

export const fakeGuitars =  new Array(10).fill(null).map(() => makeFakeGuitar());
export const fakeComments =  new Array(10).fill(null).map(() => makeFakeComment());
export const fakeCartList =  new Array(3).fill(null).map(() => makeFakeCartItem());

export const fakeGuitarsComments = {
  [datatype.string()]: [...fakeGuitars],
  [datatype.string()]: [...fakeGuitars],
  [datatype.string()]: [...fakeGuitars],
};

export const fakeGuitarData = {
  id: 1,
  name: 'Честер Bass',
  vendorCode: 'SO757575',
  type: 'electric',
  description: 'Замечательный малобюджетный вариант, созданный для новичков, которые отдают предпочтение мелодичным стилям. Прекрасно звучат блюз и баллады, исполненные на этой гитаре. Акустические свойства весьма высоки, в отличие от ее стоимости.',
  previewImg: 'img/guitar-1.jpg',
  stringCount: 7,
  rating: 4,
  price: 17500,
};

export const fakeCartItem = {
  id: 1,
  product: fakeGuitarData,
  quantity: 1,
};

export const fakeItemToDelete = {
  image: {
    src: datatype.string(),
    srcSet: datatype.string(),
  },
  price: datatype.string(),
  name: datatype.string(),
  stringCount: datatype.number(),
  vendorCode: datatype.string(),
  itemType: datatype.string(),
  id: datatype.number(),
};
