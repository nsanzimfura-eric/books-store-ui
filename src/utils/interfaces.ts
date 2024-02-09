export interface BookInterFace {
  id: string;
  title: string;
  cover_image: string;
  points: number;
  tags: string;
  writer: string;
}

export interface CartInterface {
  book: BookInterFace;
  quantity: number;
}

export interface UserInterface {
  id: string;
  full_name: string;
  email: string;
  points: number;
}
