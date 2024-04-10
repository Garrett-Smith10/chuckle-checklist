import { useEffect, useState } from "react";
import {
  postNewJoke,
  getAllJokes,
  updateJoke,
  deleteJoke,
} from "./services/jokeService.js";
import "./App.css";

export const App = () => {
  const [userJoke, setUserJoke] = useState("");
  const [allJokes, setAllJokes] = useState([]);
  const [toldJokes, setToldJokes] = useState([]);
  const [untoldJokes, setUntoldJokes] = useState([]);

  const render = () => {
    getAllJokes().then((jokesArray) => {
      setAllJokes(jokesArray);
    });
  };

  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    const allToldJokes = allJokes.filter((joke) => joke.told === true);
    setToldJokes(allToldJokes);
  }, [allJokes]); // tells us when (when "allJokes" changes): this is a dependency array

  useEffect(() => {
    const allUntoldJokes = allJokes.filter((joke) => joke.told === false);
    setUntoldJokes(allUntoldJokes);
  }, [allJokes]);

  const changeJokeValue = (jokeObject) => {
    jokeObject.told = !jokeObject.told;
    updateJoke(jokeObject.id, jokeObject).then(() => {
      render();
    });
  };

  const deleteJokeValue = (jokeId) => {
    deleteJoke(jokeId).then(() => {
      render();
    });
  };

  return (
    <div className="app-container">
      <div className="app-heading">
        <h1 className="app-heading-text">Chuckle Checklist</h1>
      </div>
        <h2 className="h2">Add Joke</h2>
      <div>
        <div className="joke-add-form">
          {/*" Input Field to enter new joke"*/}

          <input
            className="joke-input"
            type="text"
            placeholder="New One Liner"
            value={userJoke}
            onChange={(event) => {
              setUserJoke(event.target.value); // What's the value of event?
              console.log(event.target.value);
            }}
          />
          <button
            className="joke-input-submit"
            onClick={() => {
              const defaultState = {
                text: userJoke,
                told: false,
              };
              postNewJoke(defaultState).then(() => {
                render();
                setUserJoke("");
              });
            }}
          >
            Add
          </button>
        </div>
        <div className="joke-lists-container">
          <div className="joke-list-container">
            <h2>
              😐Untold{" "}
              <span className="untold-count">{untoldJokes.length}</span>
            </h2>
            <div>
              {untoldJokes.map((joke) => {
                return (
                  <section className="filtered-jokes" key={joke.id}>
                    <div className="joke-list-item">
                      <p className="joke-list-item-text">{joke.text}</p>
                    </div>
                    <div className="joke-list-action-toggle">
                      <button
                        onClick={() => {
                          changeJokeValue(joke);
                        }}
                      >
                        😐
                      </button>
                    </div>
                    <div className="joke-list-action-delete">
                      <button
                        onClick={() => {
                          deleteJokeValue(joke.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
          <div>
            <h2>
              😁Told <span className="told-count">{toldJokes.length}</span>
            </h2>
            <div>
              {toldJokes.map((joke) => {
                return (
                  <section className="filtered-jokes" key={joke.id}>
                    <div className="joke-list-item">
                      <p className="joke-list-item-text">{joke.text}</p>
                    </div>
                    <div className="joke-list-action-toggle">
                      <button
                        onClick={() => {
                          changeJokeValue(joke);
                        }}
                      >
                        😁
                      </button>
                    </div>
                    <div className="joke-list-action-delete">
                      <button
                        onClick={() => {
                          deleteJokeValue(joke.id);
                        }}
                      >
                        🗑️
                      </button>
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
