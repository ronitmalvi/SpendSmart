import React from 'react'
import { deleteItem, fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import Table from '../components/Table';
import { toast } from 'react-toastify';


//loader function
export function expensesLoader(){
    const expenses=fetchData("expenses");
    return {expenses}
}

//action
export async function expensesAction({request}){
    const data =await request.formData();
    const {_action,...values} = Object.fromEntries(data);
    if(_action==="deleteExpense"){
        try{
            //create expense
            deleteItem({
                key:"expenses",
                id:values.expenseId,

            })
            return toast.success(`Expense Delete!`)

        }
        catch(e){
            throw new Error("There was a problem deleting your Expense")

        }
    }
    
}

function ExpensesPage() {
    const {expenses}=useLoaderData()
  return (
    <div className='grid-lg'>
      <h1>All Expenses</h1>
      {
        expenses && expenses.length>0 ? (
            <div className="grid-md">
                <h2>Recent Expenses <small>({expenses.length} total)</small></h2>
                <Table expenses={expenses}/>
            </div>
        ):(<p>No expenses</p>)
      }
    </div>
  )
}

export default ExpensesPage
