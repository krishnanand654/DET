import { useState } from "react";
import { app } from "../../Firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { currdate } from "../CurrDate";
import View from "../ViewData/View";
import { Link } from "react-router-dom";
import "./expense.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faPlus,
  faClockRotateLeft,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

function Expense() {
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  //   const [remainingAmount, setRemainingAmount] = useState(0);

  const db = getFirestore(app);

  const addExpense = async () => {
    const docRef = collection(db, "dailyExpense");

    await addDoc(docRef, {
      expense: expenseName,
      amount: expenseAmount,
      date: currdate,
    })
      .then(() => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  return (
    <div className="section">
      <div className="nav-bar">
        <Link to="/history" className="btn-opt">
          <FontAwesomeIcon
            icon={faClockRotateLeft}
            style={{ color: "#ffffff" }}
            size="lg"
          />
        </Link>
        <Link to="/limit" className="btn-opt">
          <FontAwesomeIcon
            icon={faSliders}
            style={{ color: "#ffffff" }}
            size="lg"
          />
        </Link>
      </div>
      <div className="fixed">
        <button
          type="button"
          className="option"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          style={{
            background: "blueviolet",
            border: "none",
            color: "white",
            fontSize: "32px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: "730px",
            left: "320px",
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
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
