import { useState, useRef, useEffect } from "react";
import { app } from "../../Firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { currdate } from "../CurrDate";
import View from "../ViewData/View";

import "./expense.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../Navbar/Navbar";

function Expense() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [expenseStatus, setExpenseStatus] = useState(false);
  const [debtTo, setDebtTo] = useState("");
  const [enableStatus, setEnableStatus] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  //   const [remainingAmount, setRemainingAmount] = useState(0);
  const nameInputReference = useRef();

  const db = getFirestore(app);

  const addExpense = async () => {
    const docRef = collection(db, "dailyExpense");

    await addDoc(docRef, {
      expense: expenseName,
      amount: expenseAmount,
      date: currdate,
      status: expenseStatus,
      debt: debtTo,
    })
      .then(() => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    setExpenseAmount("");
    setExpenseName("");
    setExpenseStatus("");
    setEnableStatus("");
    setDebtTo("");
    setIsChecked(false);
  };

  const onDown = (e) => {
    if (e.key == "Enter") {
      addExpense();
      setExpenseAmount("");
      setExpenseName("");
      setExpenseStatus("");
      setEnableStatus("");
      setDebtTo("");
      setIsChecked(false);
      close();
    }
  };

  useEffect(() => {
    if (!enableStatus) {
      nameInputReference.current.focus();
    }
  }, [enableStatus]);

  const switches = (e) => {
    if (e.target.checked == true) {
      setExpenseStatus(true);
      setEnableStatus(false);
      setIsChecked(e.target.checked);
    } else if (e.target.checked == false) {
      setIsChecked(e.target.checked);

      setExpenseStatus(false);
      setEnableStatus(true);
    }
  };

  return (
    <div className="section">
      <Navbar flag="true" />
      <View />

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="close-ctn">
              <a
                type="button"
                className="btn-pre-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} style={{ color: "#f5f5f5" }} />
              </a>
            </div>
            <div>
              {/* <p>Remaining: ${remainingAmount}</p> */}
              <div>
                <input
                  className="form-control"
                  placeholder="Name"
                  type="text"
                  id="expense-name"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  onKeyDown={onDown}
                />
              </div>
              <div>
                <input
                  className="form-control"
                  placeholder="Amount"
                  type="number"
                  id="expense-amount"
                  value={expenseAmount}
                  onChange={(e) => setExpenseAmount(e.target.value)}
                  onKeyDown={onDown}
                />
              </div>
              <div>
                <input
                  type="checkbox"
                  id="status"
                  checked={isChecked}
                  value={enableStatus}
                  onKeyDown={onDown}
                  onClick={switches}
                  onChange={(e) => setExpenseStatus(e.target.checked)}
                />
                <label>To be Paid</label>
              </div>
              <div>
                <input
                  className="form-control"
                  ref={nameInputReference}
                  disabled={enableStatus}
                  value={debtTo}
                  onKeyDown={onDown}
                  onChange={(e) => setDebtTo(e.target.value)}
                />
              </div>
              <div className="btn-ctn">
                <button onClick={addExpense} className="button">
                  Add Expense
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense;
