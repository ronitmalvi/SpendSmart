// loader.js

import supabase from "../config/supabaseClient";
import { fetchData } from "../helpers";

export async function dashboardLoader() {
  // Fetch username (assuming fetchData is a utility function)
  const userName = await fetchData("userName");

  // Fetch budgets
  const { budgets, error: budgetError } = await supabase
    .from('Budgets-table')
    .select();

  // Fetch expenses
  const { expenses, error: expenseError } = await supabase
    .from('Expense-table')
    .select();

  // Handle errors (you can customize this to fit your error handling strategy)
  if (budgetError || expenseError) {
    throw new Response('Failed to load data', { status: 500 });
  }

  return { userName, budgets, expenses };
}
