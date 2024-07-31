import React from 'react'
import {createBudget, createExpense, fetchData } from '../helpers'
import { useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import {toast} from 'react-toastify'
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
export function dashboardLoader(){
    const userName=fetchData("userName");
    const budgets=fetchData("budgets");
    return {userName,budgets}
}

//action
export async function dashboardAction({request}){
    const data =await request.formData();
    const {_action,...values} = Object.fromEntries(data);
    //new User submission
    if(_action==="newUser"){
        try{
            localStorage.setItem("userName",JSON.stringify(values.userName))
            return toast.success(`Welcome, ${values.userName}`)
        }
        catch(e){
            throw new Error("There was a problem creating your Account")
        }
    }

    if(_action==="createBudget"){
        try{
            //create budget
            createBudget({name:values.newBudget,amount:values.newBudgetAmount})
            return toast.success(`Budget Created!`)

        }
        catch(e){
            throw new Error("There was a problem creating your Budget")

        }
    }
    if(_action==="createExpense"){
        try{
            //create expense
            createExpense({
                name:values.newExpense,
                amount:newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense  ${values.newExpense} Created!`)

        }
        catch(e){
            throw new Error("There was a problem creating your Expense")

        }
    }
    
}

function Dashboard() {
    const {userName,budgets}=useLoaderData()
  return (
    <div>
        {userName ? (
            <div className='dashboard'>
                <h1>Welcome back,<span className='accent'>{userName}</span></h1>
                <div className='grid-sm'>
                    {
                        budgets && budgets.length > 0 ? (
                            <div className='grid-lg'>
                                <div className="flex-lg">
                                    <AddBudgetForm/>
                                    <AddExpenseForm budgets={budgets}/>
                                </div>
                            </div>
                        ): (
                            <div className="grid-sm">
                                <p>Personal Budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started!</p>
                                <AddBudgetForm/>
                            </div>
                        )
                        
                    }
                </div>
            </div>
            ) : <Intro/>}
    </div>
  )
}

export default Dashboard
