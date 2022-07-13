import { Dispatch, SetStateAction } from 'react';

export type CouponPost = {
  coupon: string,
  setCouponIsPosted: Dispatch<SetStateAction<CouponStatus | null>>,
}

export type CouponStatus = {
  title: string;
  class: string;
}
