export interface Quest {
  sequence: number;
  riddle: string;
  answer: string;
}

export interface Story {
  story_title: string;
  full_story_after_completing_quest: string;
  quests: Quest[];
}

export interface StoryDatabase {
  main: {
    stories: Story[];
  };
}
