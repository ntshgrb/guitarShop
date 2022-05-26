export type CommentPost = {
  commentData: {
    guitarId: number,
    userName: string,
    advantage: string,
    disadvantage: string,
    comment: string,
    rating: number,
},
  onSuccess: () => void,
}

