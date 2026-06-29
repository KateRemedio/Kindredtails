import React from "react";
import { Composition } from "remotion";
import { Main } from "./scenes";

export const KindredTailsVideo: React.FC = () => {
  return (
    <Composition
      id="KindredTailsVideo"
      component={Main}
      durationInFrames={1052}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};