import { Category } from "../enum/category";

export interface Registry {
    id: number;
    description: string;
    date: Date;
    value: number;
    category: Category;
}