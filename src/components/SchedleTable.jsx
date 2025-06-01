
import { FaFile, FaTrash } from "react-icons/fa";
import { MdDone, MdOutlineDoneAll } from "react-icons/md";
import { Link } from "react-router-dom";

const ScheduleTable = ( {schedule, idx }) => {
  const { _id, title, day, date, hour} = schedule;
  //console.log(_id)
  const isCompleted = true;
  return (
    <>
      <tr>
        <td>{idx + 1}</td>
        <td>{title}</td>
        <td>{day}</td>
        <td>{date}</td>
        <td>{hour}</td>
        <td>
          <div className="flex gap-4">
            {" "}
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <FaTrash className=""></FaTrash>
            </button>
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              <Link to={`/update/1`}>
                {" "}
                <FaFile />
              </Link>
            </button>
            <button className="bg-pink-500 px-4 py-2 rounded text-white">
              {isCompleted ? <MdOutlineDoneAll /> : <MdDone />}
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default ScheduleTable;
