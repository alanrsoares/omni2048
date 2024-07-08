import { consume } from "@lit/context";
import { CSSResultGroup, LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";

import { motionContext } from "~/providers/motion/motion.context";

import type { Motion } from "../motion";
import tailwind from "./tailwind.css?inline";

const styles = unsafeCSS(tailwind);

export class TWElement extends LitElement {
  public static styles: CSSResultGroup = [styles];

  @consume({ context: motionContext, subscribe: true })
  @property({ attribute: false })
  motion?: Motion;

  static define<T extends string>(tag: T) {
    customElements.define(tag, this);
  }
}
