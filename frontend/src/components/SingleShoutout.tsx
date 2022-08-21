import { Link } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./SingleShoutout.css";

interface Props {
  shoutout: Shoutout;
  onDelete: () => void;
}

const SingleShoutout = ({ shoutout, onDelete }: Props) => {
  return (
    <li className="SingleShoutout">
      <h2>
        Shoutout to{" "}
        <Link to={`/user/${encodeURIComponent(shoutout.to)}`}>
          {shoutout.to}
        </Link>
      </h2>
      <p>
        - from{" "}
        <Link to={`/user/${encodeURIComponent(shoutout.from)}`}>
          {shoutout.from}
        </Link>
      </p>
      <p>{shoutout.text}</p>
      <button onClick={() => onDelete()}>X</button>
    </li>
  );
};

export default SingleShoutout;
