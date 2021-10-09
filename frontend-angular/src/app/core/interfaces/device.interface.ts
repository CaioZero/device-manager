import {ICategory} from "./category.interface";

export interface IDevice{
  id?:number;
  color?:string;
  partNumber?:number;
  category?:ICategory;
}
