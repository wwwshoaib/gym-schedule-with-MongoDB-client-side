import { useState } from "react";
import Swal from 'sweetalert2';


import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLoaderData, useParams } from "react-router-dom";

// 🟩 Utility function to parse time string into a Date object
const parseTime = (timeStr) => {
  const now = new Date();
  if (!timeStr) return now; // fallback
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  now.setHours(hours);
  now.setMinutes(minutes);
  now.setSeconds(0);
  now.setMilliseconds(0);

  return now;
};

const UpdateSchedule = () => {
  const { id } = useParams(); // to take an ID
  const singleScheduleData = useLoaderData(); // to take an object

  const [title, setTitle] = useState(singleScheduleData?.title);
  const [day, setDay] = useState(singleScheduleData?.day);
  const [date, setDate] = useState(new Date(singleScheduleData?.date)); // 🔧 Ensure valid Date object
  const [hour, setHour] = useState(parseTime(singleScheduleData?.hour)); // 🔧 Parse time string to Date object

  const handleUpdateSchedule = (e) => {
    e.preventDefault();

    // Example of formatting to send to backend
    const formattedTime = hour.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    const updatedSchedule = {
      title,
      day,
      date,
      hour: formattedTime, // 👈 send formatted time back
    };

    console.log("Updated:", id, updatedSchedule);
    // You can now send updatedSchedule to your backend
    fetch(`http://localhost:8800/schedule/${id}`, {
      method: "PATCH", // or "PUT" depending on your backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedSchedule),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success:", data);
        // Optionally show a success message or redirect

        if (data.modifiedCount > 0) {
          Swal.fire("Data updated successfully!");
        } else {
          Swal.fire("Something went wrong.");
        }
      })
      .catch((error) => {
        console.error("Error updating schedule:", error);
      });


  };

  return (
    <div>
      <div className="bg-[#F4F3F0] lg:p-24">
        <h2 className="text-3xl text-center font-bold">Update Gym Schedule</h2>
        <form onSubmit={handleUpdateSchedule}>
          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Title</span>
              </label>
              <input
                type="text"
                name="Title"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Date</span>
              </label>
              <DatePicker
                className="input input-bordered w-full"
                selected={date} // 🔧 used only selected, not value
                onChange={(date) => setDate(date)}
              />
            </div>
          </div>

          <div className="flex gap-6 ">
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text font-bold">Day</span>
              </label>
              <select
                className="input input-bordered"
                name="day"
                id="day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              >
                <option value="sunday">Sunday</option>
                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
              </select>
            </div>
            <div className="form-control lg:w-1/2 mt-6 md:mt-0">
              <label className="label font-bold">
                <span className="label-text">Time</span>
              </label>
              <DatePicker
                // 🟥 Removed: value={hour}
                selected={hour} // ✅ keep only selected
                onChange={(newHour) => setHour(newHour)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </div>
          </div>

          <input
            type="submit"
            value="Update Schedule"
            className="btn w-full bg-pink-500 text-white mt-6"
          />
        </form>
      </div>
    </div>
  );
};

export default UpdateSchedule;
