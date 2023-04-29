import { FormControl } from "@angular/forms";
import { IPicture } from "./picture";
import { ICategory } from "./category";

export interface IProduct {
  id: number;
  name: string;
  pictures: Array<IPicture>;
  category: ICategory;
  description: string;
  price: number;
  enabled: boolean;
}