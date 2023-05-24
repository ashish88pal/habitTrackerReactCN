import { useSnackbar } from "notistack";

function HabitsCompo({ habitData, setHabitData, isWeekSelected }) {
  const weeklyDate = [];
  for (let i = 0; i < 7; i++) {
    weeklyDate.push(getCurrentDate(i - 6));
  }

  return (
    <div className="habbit-display__width">
      <ul className="habit-list">
        <li className="with-weekly">
          {habitData.map((item, index) => (
            <SingleHabitCompo
              key={index}
              singleHabit={item}
              habitData={habitData}
              setHabitData={setHabitData}
              weeklyDate={weeklyDate}
              isWeekSelected={isWeekSelected}
            />
          ))}
        </li>
      </ul>
    </div>
  );
}

function SingleHabitCompo({
  singleHabit,
  setHabitData,
  weeklyDate,
  isWeekSelected,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const updateHabitDates = (date) => {
    setHabitData((existingItems) => {
      const itemIndex = existingItems.findIndex(
        (item) => item.content === singleHabit.content
      );

      const datesIndex = singleHabit.dates.findIndex(
        (item) => item.date === date
      );

      return [
        ...existingItems.slice(0, itemIndex),
        {
          ...existingItems[itemIndex],
          dates: [
            ...singleHabit.dates.slice(0, datesIndex),

            {
              date: date,
              status:
                datesIndex === -1
                  ? "yes"
                  : singleHabit.dates[datesIndex].status === "yes"
                  ? "no"
                  : singleHabit.dates[datesIndex].status === "no"
                  ? "unMarked"
                  : "yes",
            },
            ...singleHabit.dates.slice(datesIndex + 1),
          ],
        },
        ...existingItems.slice(itemIndex + 1),
      ];
    });
  };

  const dateStatus = (dateToCheck) => {
    return (
      singleHabit.dates.length !== 0 &&
      (typeof singleHabit.dates.find((date) => {
        return date.date === dateToCheck;
      }) === "undefined"
        ? false
        : singleHabit.dates.find((date) => {
            return date.date === dateToCheck;
          }).status)
    );
  };

  const addToFavorite = () => {
    setHabitData((existingItems) => {
      const itemIndex = existingItems.findIndex(
        (item) => item.content === singleHabit.content
      );

      return [
        ...existingItems.slice(0, itemIndex),
        {
          ...existingItems[itemIndex],
          isFavorite: !singleHabit.isFavorite,
        },
        ...existingItems.slice(itemIndex + 1),
      ];
    });
    enqueueSnackbar(
      singleHabit.isFavorite ? "Removed from favorite" : "Added to favorite",
      { variant: "success" }
    );
  };

  const deleteHabit = () => {
    setHabitData((existingItems) => {
      const itemIndex = existingItems.findIndex(
        (item) => item.content === singleHabit.content
      );

      return [
        ...existingItems.slice(0, itemIndex),

        ...existingItems.slice(itemIndex + 1),
      ];
    });
    enqueueSnackbar("Habit deleted successfully", { variant: "success" });
  };

  const stringToName = {
    "01": "Jan",
    "02": "Feb",

    "03": "Mar",

    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };

  return (
    <div className="habit-lst">
      <div className="habit-list-item">
        <div className="habit-list-item-name">{singleHabit.content}</div>

        <div className="actions">
          <div
            onClick={() => {
              updateHabitDates(getCurrentDate());
            }}
          >
            {dateStatus(getCurrentDate()) === "yes" ? (
              <i className="fas fa-check-circle done"></i>
            ) : dateStatus(getCurrentDate()) === "no" ? (
              <i className="fas fa-times-circle undone"></i>
            ) : (
              <i className="fas fa-minus-circle unchecked"></i>
            )}
          </div>
          <div onClick={addToFavorite}>
            {singleHabit.isFavorite ? (
              <i className="fa-solid fa-star favorite"></i>
            ) : (
              <i className="fa-regular fa-star favorite"></i>
            )}
          </div>

          <div onClick={deleteHabit}>
            <i className="fa-solid fa-trash remove"></i>
          </div>
        </div>
      </div>

      {isWeekSelected && (
        <div className="weekly__container">
          {weeklyDate.map((day, index) => (
            <div
              className={
                dateStatus(day) === "yes"
                  ? "weekly__date done"
                  : dateStatus(day) === "no"
                  ? "weekly__date undone"
                  : "weekly__date unchecked"
              }
              // style={{backgroundColor : dateStatus(day) === "yes" ? "#b8fb63" : dateStatus(day) === "no" ? "#C21330" : "#4661f1" }}
              key={index}
              onClick={() => {
                updateHabitDates(day);
                // {dateStatus(day) === "yes" ? "done" : dateStatus(day) === "no" ? "undone" : "unchecked"}
              }}
            >
              <p style={{ fontSize: "35px", fontWeight: "bolder" }}>
                {day.substring(0, 2)}
              </p>
              <p style={{ fontWeight: "bold" }}>
                {stringToName[day.substring(3, 5)]}
              </p>
              <p>{day.substring(6)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function getCurrentDate(plus = 0) {
  const today = new Date();
  const currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() + plus);

  let [dd, mm, yyyy] = [
    currentDate.getDate(),
    currentDate.getMonth() + 1,
    currentDate.getFullYear(),
  ];
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "/" + mm + "/" + yyyy;
}

export default HabitsCompo;
