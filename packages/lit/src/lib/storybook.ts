import type { StoryFn } from "@storybook/web-components";

export const makeStoryFn =
  <T extends Record<string, unknown>>(Template: StoryFn<T>) =>
  (args: T): StoryFn<T> => {
    const Wrapped = Template.bind({});
    Wrapped.args = args;
    return Wrapped;
  };
