import { app } from "../../Firebase";
import {
  getFirestore,
  setDoc,
  collection,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./limit.css";

function Limit() {
  const [dailyLimit, setDailyLimit] = useState(0);
  const [data, setData] = useState([]);
  // const [id, setId] = useState();
  const db = getFirestore(app);

  async function addTotalExp() {
    const colRef = doc(db, "totalExpense", "BqDtIhleu7MgU1T8eRYA");

    await setDoc(colRef, { total: dailyLimit })
      .then(() => {
        console.log("Document written with ID: ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  useEffect(() => {
    const q1 = query(collection(db, "totalExpense"));
    const unsubscribe3 = onSnapshot(q1, (snapshot) => {
      snapshot.forEach((doc) => {
        // setId(doc.id);
        setData(doc.data().total); //.data() contains the data from the promise
      });
    });

    return () => unsubscribe3();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="section">
        <Navbar />
        <div className="limit-ctn">
          <p style={{ textAlign: "center", color: "grey" }}>Your Daily Limit</p>
          <h1 style={{ textAlign: "center", fontSize: "3rem" }}>{data}</h1>
        </div>
        {/* <p>{id}</p> */}

        <input
          className="form-control"
          type="number"
          onChange={(e) => {
            setDailyLimit(e.target.value);
          }}
        />
        <div className="button-add-ctn">
          <button onClick={addTotalExp} className="button">
            Add expense
          </button>
        </div>
      </div>
    </>
  );
}

export default Limit;
