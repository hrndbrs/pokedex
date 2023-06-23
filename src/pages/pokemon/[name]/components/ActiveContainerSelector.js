import { useState } from "react";
import { useRouter } from "next/router";

const containerInitState = [
    {
      name: "Description",
      id: "description",
      isActive: true,
    },
    {
      name: "Abilities",
      id: "abilities",
      isActive: false,
    },
    {
      name: "Moveset",
      id: "moveset",
      isActive: false,
    },
  ]

function ActiveContainerSelector() {
  const router = useRouter();

  const path = router.asPath;

  const [activeAppended, setActiveAppended] = useState(containerInitState);

  const activeContainer = (containerId) => {
    router.push(`${path.replace(/#.*/, "")}#${containerId}`);
    setActiveAppended((prevState) => {
      const modified = prevState.map((obj) => {
        if (obj.id === containerId) return { ...obj, isActive: true };
        return { ...obj, isActive: false };
      });
      return modified;
    });
  };

  return (
    <ul>
      {activeAppended.map((container) => (
        <li key={container.id}>
          <button
            onClick={() => {
              activeContainer(container.id);
            }}
          >
            {container.id.toUpperCase()}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ActiveContainerSelector;
