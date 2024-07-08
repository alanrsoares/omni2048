import { html } from "lit";

import type { Meta } from "@storybook/web-components";
import { makeStoryFn } from "~/lib/storybook";

import "~/components/button/button.element";
import "./motion.provider";

import { customElement } from "lit/decorators.js";

import { TWElement } from "~/lib/tailwind";

export default {
  title: "Components/motion-provider",
  component: "motion-provider",
  argTypes: {},
} satisfies Meta;

type Args = {
  slot?: string;
};

@customElement("motion-test-element")
export class MotionTestElement extends TWElement {
  render() {
    return html`<div>Hello, world!</div>`;
  }
}

const story = makeStoryFn<Args>((props) => {
  return html`<motion-provider>
    <div>${props.slot}</div>
    <motion-test-element></motion-test-element>
  </motion-provider>`;
});

export const Default = story({});
