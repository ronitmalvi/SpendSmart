import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import {toast} from 'react-toastify'
export async function logoutAction(){
    //delete a user
    deleteItem({
        key:"userName"
    })
    //return redirect
    return redirect("/");
}