import { provide } from "@lit/context";
import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { Motion } from "~/lib/motion";

import { motionContext } from "./motion.context";

@customElement("motion-provider")
export class MotionProvider extends LitElement {
  @provide({ context: motionContext })
  motion = new Motion();

  render() {
    return html`<slot></slot>`;
  }
}
