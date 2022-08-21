import Shoutout from "../models/Shoutout";
import "./ShoutoutList.css";
import SingleShoutout from "./SingleShoutout";

interface Props {
  shoutouts: Shoutout[];
  onDelete: (id: string) => void;
}

const ShoutoutList = ({ shoutouts, onDelete }: Props) => {
  return (
    <ul className="ShoutoutList">
      {shoutouts.map((shoutout) => (
        <SingleShoutout
          shoutout={shoutout}
          key={shoutout._id}
          onDelete={() => onDelete(shoutout._id!)}
        />
      ))}
    </ul>
  );
};

export default ShoutoutList;
