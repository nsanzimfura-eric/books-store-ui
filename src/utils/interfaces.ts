export interface BookInterFace {
  id: string;
  title: string;
  cover_image: string;
  points: number;
  tags: string;
}

export interface CartInterface {
  book: BookInterFace;
  quantity: number;
}
