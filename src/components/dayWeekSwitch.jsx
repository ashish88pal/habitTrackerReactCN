function DayWeekSwitch({ isWeekSelected, setWeekSelected }) {
  return (
    <>
      <button
        className={
          !isWeekSelected ? "weekly-daily-btn activeBtn" : "weekly-daily-btn"
        }
        onClick={() => setWeekSelected(false)}
      >
        Daily
      </button>
      <button
        className={
          isWeekSelected ? "weekly-daily-btn activeBtn" : "weekly-daily-btn"
        }
        onClick={() => setWeekSelected(true)}
      >
        weekly
      </button>
    </>
  );
}

export default DayWeekSwitch;
