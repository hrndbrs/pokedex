import React from "react";
import styles from "./styles/InfoSection.module.scss";

function InfoSection(props) {
  return (
    <>
      <Description props={props} />
      <div id="abilities"></div>
      <div id="moveset"></div>
    </>
  );
}

function Description({
  props: {
    data: { height, weight, habitat },
    types,
    description,
  },
}) {
  return (
    <div id="description">
      <p>{description} </p>
      <div>
        <p>Height: {height * 10}cm</p>
        <p>Weight: {weight / 10}kg</p>
      </div>
      <div>
        {types.map((type) => (
          <div
            className={`${styles[type.name]} ${styles[type.index]}`}
            key={`${type.index} typing`}
          >
            {type.name.toUpperCase()}
          </div>
        ))}
      </div>
      {habitat && (
        <div>
          <span>{habitat?.name.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

export default InfoSection;
