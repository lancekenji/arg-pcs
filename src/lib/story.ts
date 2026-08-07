import stories from "../data/quests.json";

import type { Story } from "../types/story";

export function getStories(): Story[] {
  return stories.main.stories;
}

export function getStory(storyId: number): Story {
  return getStories()[storyId];
}

export function getRandomStory(): number {
  return Math.floor(Math.random() * getStories().length);
}
