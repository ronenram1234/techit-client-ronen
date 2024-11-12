import axios from "axios";
import { User } from "../interfaces/User";

const api: string = `${process.env.REACT_APP_API}/Users`;



export function  checkUser(user:User):Promise<any>{
   
    return axios.get(`${api}?email=${user.email}&password=${user.password}`);

}

export function newUser(user:User):Promise<any>{

    return axios.post(api,user)
}