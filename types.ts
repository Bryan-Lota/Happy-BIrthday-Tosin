export enum Scene {
  INTRO = 'INTRO',         // Start button / Black screen
  BALLOONS = 'BALLOONS',   // Balloons rising
  CAKE_DROP = 'CAKE_DROP', // Huge cake falls in
  CANDLES = 'CANDLES',     // Candles light up
  WISH_TIME = 'WISH_TIME', // "Make a wish" text
  CARD_REVEAL = 'CARD_REVEAL', // Card slides in
  CARD_OPEN = 'CARD_OPEN', // Card opens, message generates
}

export interface AnimationStageProps {
  currentScene: Scene;
  onNextScene: (scene: Scene) => void;
}

export interface GeminiResponse {
  wish: string;
}
