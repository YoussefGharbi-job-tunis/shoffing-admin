import { Product } from './product';
import { User } from './user';


export interface Commande{
    id?:string,
    cart?: Product[],
    client?:User,
    total?:number
    type?:string,
    createdAt?: any,
}