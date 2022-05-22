import { UserComment } from './comment';

export type Guitar = {
  id: number,
  name: string,
  vendorCode: string,
  type: string,
  description: string,
  previewImg: string,
  stringCount: number,
  rating: number,
  price: number,
}

export type GuitarData = {
  guitar: Guitar | null,
  comments: UserComment[] | null,
}
