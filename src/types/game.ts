export type AnswerValidationResult =
  | {
      success: true;
    }
  | {
      success: false;
      reason: "wrong-answer";
    };

export type GamePhase = "registration" | "quest" | "finish" | "completed";
