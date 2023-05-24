import DayWeekSwitch from "./dayWeekSwitch";
import HabitsCompo from "./habit";
import InputCompo from "./inputCompo";

import { useState } from "react";
import "../assets/css/home.css";
import emptyImage from "../assets/images/bored.png";
import logo from "../assets/images/logo.png";

function Home() {
  const [habitData, setHabitData] = useState([]);

  const [isWeekSelected, setWeekSelected] = useState(true);

  return (
    <div className="row">
      <div className="leftColumn">
        <h1 id="title">Track Your Daily Habits</h1>

        <img src={logo} alt="logo" style={{}} />
        <InputCompo setHabitData={setHabitData} habitData={habitData} />
      </div>

      <div className="rightColumn">
        <div id="symbol">
          <i className="fas fa-check-circle"></i>
          <p>Done&emsp;&emsp;</p>
          <i className="fas fa-times-circle"></i>
          <p>Not Done&emsp;&emsp;</p>
          <i className="fas fa-minus-circle"></i>
          <p>Unmarked&emsp;&emsp;</p>
          <DayWeekSwitch
            isWeekSelected={isWeekSelected}
            setWeekSelected={setWeekSelected}
          />
        </div>

        {habitData.length !== 0 ? (
          <HabitsCompo
            habitData={habitData}
            setHabitData={setHabitData}
            isWeekSelected={isWeekSelected}
          />
        ) : (
          <div style={{ height: "100%" }}>
            <img src={emptyImage} alt="empty" style={{ height: "75%" }} />
            <p style={{ color: "white", fontSize: "30px" }}>No habits ☹️</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
