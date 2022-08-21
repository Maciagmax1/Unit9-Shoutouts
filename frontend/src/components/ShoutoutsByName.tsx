import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteById,
  getShoutoutsByName,
} from "../services/shoutoutService";
import ShoutoutForm from "./ShoutoutForm";
import ShoutoutList from "./ShoutoutList";
import "./ShoutoutsByName.css";

const ShoutoutsByName = () => {
  const name: string | undefined = useParams().name;
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const getAndSetShoutouts = (): void => {
    getShoutoutsByName(name!).then((response) => {
      setShoutouts(response);
    });
  };

  const submitShoutout = (shoutout: Shoutout): void => {
    addShoutout(shoutout).then(() => {
      getAndSetShoutouts();
    });
  };

  const deleteShoutout = (id: string): void => {
    deleteById(id).then(() => {
      getAndSetShoutouts();
    });
  };

  useEffect(() => {
    getAndSetShoutouts();
  }, [name]);

  return (
    <div className="ShoutoutsByName">
      <h1>Shoutouts for {name}</h1>
      <Link to="/">Back to shoutouts</Link>
      <ShoutoutList shoutouts={shoutouts} onDelete={deleteShoutout} />
      <ShoutoutForm onAdd={submitShoutout} />
    </div>
  );
};

export default ShoutoutsByName;
