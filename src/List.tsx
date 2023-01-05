import React, { FC, ReactElement } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ListComponentProps, ListItemProps } from "./App.types";

const List: FC<ListComponentProps> = ({
  items,
  removeItem,
  editItem,
}: ListComponentProps): ReactElement => {
  return (
    <div className="grocery-list">
      {items.map((item: ListItemProps) => {
        const { id, title } = item;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
