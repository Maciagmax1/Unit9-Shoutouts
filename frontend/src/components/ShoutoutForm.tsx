import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import "./ShoutoutForm.css";

interface Props {
  onAdd: (shoutout: Shoutout) => void;
}

const ShoutoutForm = ({ onAdd }: Props) => {
  const name: string | undefined = useParams().name;
  const [to, setTo] = useState(name || "");
  const [from, setFrom] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault();
    onAdd({ to, from, text });
    setTo("");
    setFrom("");
    setText("");
  };

  return (
    <form className="ShoutoutForm" onSubmit={(e) => handleSubmit(e)}>
      <label htmlFor="to">To</label>
      <input
        type="text"
        name="to"
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <label htmlFor="from">From</label>
      <input
        type="text"
        name="from"
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <label htmlFor="text">text</label>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button>Add</button>
    </form>
  );
};

export default ShoutoutForm;
