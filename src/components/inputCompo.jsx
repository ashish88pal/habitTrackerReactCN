import { useSnackbar } from "notistack";
import { useState } from "react";

function InputCompo({ habitData, setHabitData }) {
  const [habitName, setHabitName] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  return (
    <div id="input">
      <form className="input-form">
        <input
          name="habit"
          type="text"
          placeholder="write your habbit here ..."
          value={habitName}
          required
          onChange={(e) => setHabitName(e.target.value)}
        />
        <button
          type="submit"
          id="form-btn"
          // id="form-btn"
          onClick={(e) => {
            e.preventDefault();
            habitName
              ? enqueueSnackbar("Habit added successfully", {
                  variant: "success",
                })
              : enqueueSnackbar("Habit name can't be empty", {
                  variant: "error",
                });

            habitName &&
              setHabitData([
                { content: habitName, dates: [], isFavorite: false },

                ...habitData,
              ]);
            setHabitName("");
          }}
        >
          + Add your Habit
        </button>
      </form>
    </div>
  );
}

export default InputCompo;
