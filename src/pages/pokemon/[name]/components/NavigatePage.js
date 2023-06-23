import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles/NavigatePage.module.css"

const NavigatePage = (props) => {
  const { id, name, sprite, size} = props
  const direction = id === 0 ? "left" : "right";
  const width = 120;
  const height = (1532 / 1772) * width;

  return (
    <Link
      className={id === 0 ? styles.prev : styles.next}
      href={`/pokemon/${name}`}
    >
      <button
        className={styles.navArrow}
      >
        <Image
          className={styles[direction]}
          src={`/logos/pokeball-arrow-${direction}02.svg`}
          width={width}
          height={height}
          alt={`${direction} arrow`}
        />
        <Image
          className={styles.navImage}
          src={sprite}
          alt={name}
          width={size}
          height={size}
        />
      </button>
    </Link>
  );
};

export default NavigatePage;
