
export interface IPost {
  _id: string;
  title: string;
  content: string;
  url: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
