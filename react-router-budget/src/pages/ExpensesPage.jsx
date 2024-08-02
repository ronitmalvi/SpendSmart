import React from 'react'
import { fetchData } from '../helpers';
import { useLoaderData } from 'react-router-dom';
import Table from '../components/Table';


//loader function
export function expensesLoader(){
    const expenses=fetchData("expenses");
    return {expenses}
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
