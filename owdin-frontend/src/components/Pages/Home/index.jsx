import Navbar from "../../Navbar"
import BalanceBar from "../../BalanceBar"
import ExpenseFeed from "../../ExpenseFeed"
import AddExpenseModal from "../../ExpenseCreate/AddExpenseModal"
import ExpenseCreate from "../../ExpenseCreate"

const Home = () => {

  return (
    <>
      <Navbar/>
      <BalanceBar/>
      <ExpenseFeed/>
      <ExpenseCreate/>
    </>
  )
}

export default Home