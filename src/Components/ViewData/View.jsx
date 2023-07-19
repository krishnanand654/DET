import { useEffect, useState, useRef } from "react";
import { app } from "../../Firebase";
import { collection, getFirestore, deleteDoc, doc } from "firebase/firestore";
import { onSnapshot, query, where } from "firebase/firestore";
import { currdate } from "../CurrDate";
import { Chart } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./view.css";

const View = () => {
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [remaining, setRemainingAmount] = useState(0);
  const chartRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "dailyExpense"),
      where("date", "==", currdate)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedDocuments = [];
      let sum = 0;
      snapshot.forEach((doc) => {
        const docData = doc.data();
        docData.id = doc.id; // Set the correct identifier for deletion
        updatedDocuments.push(docData);
        sum += parseInt(docData.amount);
      });

      setAmount(sum);
      setData(updatedDocuments);
    });

    const unsubscribe2 = onSnapshot(
      collection(db, "totalExpense"),
      (snapshot) => {
        snapshot.forEach((doc) => {
          setTotal(doc.data().total);
          setRemainingAmount(doc.data().total - amount); // Calculate remaining amount here
        });
      }
    );

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [db, amount]);

  async function del(delId) {
    try {
      await deleteDoc(doc(db, "dailyExpense", delId)); // Delete from "dailyExpense" collection
      console.log("Document successfully deleted");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  }

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById("acquisitions1");

      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the existing chart if it exists
      }

      const label = data.map((item) => item.expense);

      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              label: "",
              borderRadius: 5,
              borderSkipped: false,
              data: data.map((item) => item.amount),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
              barThickness: 30,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);
  const today = new Date();
  const options = { weekday: "short", month: "short", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="main">
        <div className="card-ctn">
          <img className="card-img" src="/card.png" />
        </div>
        <div className="section">
          <div className="today-head">
            <h1>{formattedDate}</h1>
          </div>
          <div className="card-ctn">
            <div className="blc-ctn" style={{ marginRight: " 10px " }}>
              <p className="balance">Total Balance</p>
              <h1 className="rem">
                <span style={{ fontWeight: "500" }}>₹</span>{" "}
                {remaining ? remaining : total}
              </h1>
              <span className="total">₹ {total} Daily Limit</span>
            </div>
            <div className="blc-ctn">
              <p className="balance">Total Spend</p>
              <span className="spend">
                <span style={{ fontWeight: "500" }}>₹ </span>
                {amount}
              </span>
            </div>
          </div>
          <div className="card">
            <div className="graph">
              <canvas id="acquisitions1"></canvas>
            </div>
          </div>
        </div>

        <div className="section-two">
          <h2 className="exp-head">Daily Expense</h2>

          {data.map((element) => (
            <div
              key={element.id}
              className="card"
              style={{ padding: "10px", margin: "0 0 10px" }}
            >
              <div className="exp-card-ctn">
                <p className="exp-name">
                  {element.expense.charAt(0).toUpperCase() +
                    element.expense.slice(1)}
                </p>
                <p className="exp-amount">
                  <span style={{ fontWeight: "400" }}>₹</span> {element.amount}
                </p>
              </div>
              <p className="exp-date">{element.date}</p>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <button className="btn" onClick={() => del(element.id)}>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    style={{ color: "#fafafa" }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default View;
