import { FormControl } from "@angular/forms";
import { IPicture } from "./picture";

export interface IProduct {
  id: number;
  name: string;
  pictures: Array<IPicture>;
  description: string;
  price: number;
}