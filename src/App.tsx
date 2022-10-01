import React, { useState, useEffect } from "react";
import Alert from "./Alert";
import { AlertProps, ListItemProps } from "./App.types";
import List from "./List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list")!);
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState<string>("");
  const [list, setList] = useState<ListItemProps[]>(getLocalStorage());
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editID, setEditID] = useState<string>("");
  const [alert, setAlert] = useState<AlertProps>({
    show: false,
    msg: "",
    type: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hello, World!");

    if (!name) {
      /* display alert */
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      /* deal with edit */
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID("");
      setIsEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      /* show alert, new item */
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (
    show: boolean = false,
    type: string = "",
    msg: string = ""
  ): void => {
    setAlert({ show, msg, type });
  };

  const clearList = (): void => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id: string): void => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id: string): void => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem!.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
