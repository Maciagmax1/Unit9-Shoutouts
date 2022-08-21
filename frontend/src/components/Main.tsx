import { useEffect, useState } from "react";
import Shoutout from "../models/Shoutout";
import {
  addShoutout,
  deleteById,
  fetchShoutouts,
} from "../services/shoutoutService";
import "./Main.css";
import ShoutoutForm from "./ShoutoutForm";
import ShoutoutList from "./ShoutoutList";

const Main = () => {
  const [shoutouts, setShoutouts] = useState<Shoutout[]>([]);

  const getAndSetShoutouts = (): void => {
    fetchShoutouts().then((response) => {
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
  }, []);

  return (
    <main className="Main">
      <h1>All Shoutouts</h1>
      <ShoutoutList shoutouts={shoutouts} onDelete={deleteShoutout} />
      <ShoutoutForm onAdd={submitShoutout} />
    </main>
  );
};

export default Main;
