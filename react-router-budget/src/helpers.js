// local storage
export const fetchData=(key)=>{
    return JSON.parse(localStorage.getItem(key));
};

const generateRandomColor=()=>{
    const existingBudgetlength=fetchData("budgets")?.length ?? 0;
    return `${existingBudgetlength*34} 65% 50%`
}
//create Budget
export const createBudget=({name,amount})=>{
    const newItem={
        id:crypto.randomUUID(),
        name:name,
        createdAt:Date.now(),
        amount:+amount,
        color:generateRandomColor()
    }
    const existingBudgets=fetchData("budgets") ?? []
    return localStorage.setItem("budgets",JSON.stringify([...existingBudgets,newItem]))
}

//create expense
export const createExpense=({name,amount,budgetId})=>{
    const newItem={
        id:crypto.randomUUID(),
        name:name,
        createdAt:Date.now(),
        amount:+amount,
        budgetId:budgetId
    }
    const existingExpenses=fetchData("expenses") ?? []
    return localStorage.setItem("expenses",JSON.stringify([...existingExpenses,newItem]))
}

//delete item
export const deleteItem=({key})=>{
    return localStorage.removeItem(key);
}

//formatting currency
export const formatCurrency=(amt)=>{
    return amt.toLocaleString(undefined,{
        style:"currency",
        currency:"USD"
    })
}
//
export const formatPercentage=(amt)=>{
return amt.toLocaleString(undefined,{
    style:"percent",
    minimumFractionDigits:0,
})
}

export const formatDateToLocaleString=(epoch)=>{
    return new Date(epoch).toLocaleDateString();
}

//total spent by budget
export const calculateSpentByBudget=(budgetId)=>{
    const expenses=fetchData("expenses") ?? [];
    const budgetSpent=expenses.reduce((acc,expense)=>{
        //check if the expense.id === budgetId I passed in
        if(expense.budgetId!==budgetId) return acc

        //add the current amount to total
        return acc+=expense.amount
    },0)
    return budgetSpent;
}