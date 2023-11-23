import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function CharacterAttributes({ totalPoints }) {
  const maxAttribute = totalPoints === 1 ? 1 : Math.floor(0.7 * totalPoints);
  const [healthPoints, setHealthPoints] = useState(0);
  const [staminaPoints, setStaminaPoints] = useState(0);
  const [speedPoints, setSpeedPoints] = useState(0);

  const handleSliderChange = (e, setAttribute) => {
    const value = +e.target.value;
    const othersTotal = getOthersTotal(e.target.id);
    if (value > maxAttribute) {
      if (value + othersTotal > totalPoints) {
        setAttribute(totalPoints - othersTotal);
        return;
      }
      setAttribute(maxAttribute);
      return;
    }
    if (value + othersTotal > totalPoints) {
      setAttribute(totalPoints - othersTotal);
      return;
    }
    setAttribute(value);
  };

  const getOthersTotal = (id) => {
    switch (id) {
      case 'health':
        return staminaPoints + speedPoints;
      case 'stamina':
        return healthPoints + speedPoints;
      case 'speed':
        return healthPoints + staminaPoints;

      default:
        break;
    }
  };

  let remainingPoints =
    totalPoints - healthPoints - staminaPoints - speedPoints;
  return (
    <div>
      Character stats: <span id="points">{remainingPoints}</span> points left.
      <div>
        <input
          type="range"
          id="health"
          min="0"
          max={totalPoints}
          value={healthPoints}
          onChange={(e) => handleSliderChange(e, setHealthPoints)}
          step="1"
        />
        Health
      </div>
      <div>
        <input
          type="range"
          id="stamina"
          min="0"
          max={totalPoints}
          value={staminaPoints}
          onChange={(e) => handleSliderChange(e, setStaminaPoints)}
          step="1"
        />
        Stamina
      </div>
      <div>
        <input
          type="range"
          id="speed"
          min="0"
          max={totalPoints}
          value={speedPoints}
          onChange={(e) => handleSliderChange(e, setSpeedPoints)}
          step="1"
        />
        Speed
      </div>
    </div>
  );
}

document.body.innerHTML = "<div id='root'></div>";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<CharacterAttributes totalPoints={15} />);
