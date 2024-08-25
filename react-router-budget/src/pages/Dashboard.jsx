import React, { useEffect, useState } from 'react'
import {createBudget, createExpense, deleteItem, fetchData } from '../helpers'
import { Link, useLoaderData } from 'react-router-dom';
import Intro from '../components/Intro';
import {toast} from 'react-toastify'
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';
import supabase from '../config/supabaseClient';

//loader function
// export function dashboardLoader(){
//     const userName=fetchData("userName");
//     const [fetchError,setFetchError]=useState(null);
//     const [budgets,setbudget]=useState(null);
//     const [expenses,setexpense]=useState(null);

//     useEffect(()=>{
//         const fetchBudgets=async()=>{
//             const {data,error} = await supabase
//             .from('Budgets-table')
//             .select()

//             if(error){
//                 setFetchError('Could not fetch the budget')
//                 setbudget(null)
//                 console.log(error)
//             }
//             if(data){
//                 setbudget(data)
//                 setFetchError(null)
//             }
//         }

//         const fetchExpenses=async()=>{
//             const {data,error} = await supabase
//             .from('Expense-table')
//             .select()

//             if(error){
//                 setFetchError('Could not fetch the expense')
//                 setexpense(null)
//                 console.log(error)
//             }
//             if(data){
//                 setexpense(data)
//                 setFetchError(null)
//             }
//         }

//         fetchBudgets();
//         fetchExpenses();

//     },[])
//     return {userName,budgets,expenses,fetchError}
// }

//action function called by APP
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
            // createBudget({
            //     name:values.newBudget,
            //     amount:values.newBudgetAmount})
            // return toast.success(`Budget Created!`)
            const {data,error} =await supabase
                .from('Budgets-table')
                .insert([{name:values.newBudget,amount:values.newBudgetAmount,color:'34% 65% 50%'}])

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
                amount:values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success(`Expense  ${values.newExpense} Created!`)

        }
        catch(e){
            throw new Error("There was a problem creating your Expense")

        }
    }
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

function Dashboard() {
    const userName=fetchData("userName");
    const [fetchError,setFetchError]=useState(null);
    const [budgets,setbudget]=useState(null);
    const [expenses,setexpense]=useState(null);

    useEffect(()=>{
        const fetchBudgets=async()=>{
            const {data,error} = await supabase
            .from('Budgets-table')
            .select()

            if(error){
                setFetchError('Could not fetch the budget')
                setbudget(null)
                console.log(error)
            }
            if(data){
                setbudget(data)
                setFetchError(null)
            }
        }

        const fetchExpenses=async()=>{
            const {data,error} = await supabase
            .from('Expense-table')
            .select()

            if(error){
                setFetchError('Could not fetch the expense')
                setexpense(null)
                console.log(error)
            }
            if(data){
                setexpense(data)
                setFetchError(null)
            }
        }

        fetchBudgets();
        fetchExpenses();

    },[])
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
                                <h2>Existing Budgets</h2>
                                <div className="budgets">
                                    {
                                        budgets.map((budget)=>{
                                           return <BudgetItem key={budget.id} budget={budget}/>
                                        })
                                    }
                                </div>
                                {
                                    expenses && expenses.length>0 && (
                                        <div className="grid-md">
                                            <h2>Recent Expenses</h2>
                                            <Table expenses={expenses.sort((a,b)=>b.createdAt-a.createdAt).slice(0,8)}/>
                                            {expenses.length>8 && (
                                                <Link
                                                    to="expenses"
                                                    className='btn btn--dark'
                                                >
                                                View All Expenses    </Link>
                                            )}
                                        </div>
                                    )
                                }
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
