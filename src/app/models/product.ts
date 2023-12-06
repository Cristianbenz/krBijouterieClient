import { ICategory } from "./category";

export interface IProduct {
  id: number;
  name: string;
  pictures: Array<string>;
  category: ICategory;
  description: string;
  price: number;
  enabled: boolean;
}