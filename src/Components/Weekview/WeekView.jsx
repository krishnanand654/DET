import { useEffect, useState, useRef } from "react";
import { app } from "../../Firebase";
import { getDocs, collection, getFirestore } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import currDate from "../CurrDate";
import Chart from "chart.js/auto";
import "./../ViewData/view.css";

const WeekView = () => {
  const db = getFirestore(app);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const fullDate = currDate(selectedDate);

      if (selectedDate) {
        const q = query(
          collection(db, "dailyExpense"),
          where("date", "==", String(fullDate))
        );
        const snapshot = await getDocs(q);
        const updatedData = snapshot.docs.map((doc) => doc.data());
        setData(updatedData);
      }
    };

    fetchData();
  }, [db, selectedDate]);

  useEffect(() => {
    if (data.length > 0) {
      const ctx = document.getElementById("acquisitions");
      const labels = data.map((item) => item.expense);
      const amounts = data.map((item) => item.amount);
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the existing chart if it exists
      }
      chartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "",
              borderRadius: 5,
              borderSkipped: false,
              data: amounts,
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

  return (
    <>
      <div className="main">
        <div className="section">
          <div>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>
          <div className="card">
            <div className="graph">
              <canvas id="acquisitions"></canvas>
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
              <div style={{ display: "flex", justifyContent: "end" }}></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WeekView;
