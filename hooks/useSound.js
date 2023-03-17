import { useEffect } from "react";
import sound1 from "./../assets/sounds/ambient-piano-ampamp-strings-10711.mp3";
import sound2 from "./../assets/sounds/an-inspired-morning-141215.mp3";
import sound3 from "./../assets/sounds/cinematic-fairy-tale-story-main-8697.mp3";
import sound4 from "./../assets/sounds/floating-abstract-142819.mp3";
import sound5 from "./../assets/sounds/piano-moment-9835.mp3";
import sound6 from "./../assets/sounds/sedative-110241.mp3";
import sound7 from "./../assets/sounds/waterfall-140894.mp3";

export default function useSound(soundObject) {
  let soundNames = [sound1, sound2, sound3, sound4, sound5, sound6, sound7];

  async function playSound(soundFilePath) {
    try {
      await soundObject.loadAsync(soundFilePath);
      await soundObject.playAsync();
    } catch (e) {
      console.log("error", e);
    }
  }

  useEffect(() => {
    soundNames.sort(() => Math.random() - 0.5);

    playSound(soundNames[0]);

    return soundObject
      ? () => {
          soundObject.unloadAsync();
        }
      : undefined;
  }, []);
}
