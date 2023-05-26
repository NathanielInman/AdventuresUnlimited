import * as color from './colors';

export class ColorMessage {
  constructor (message) {
    const parts = message.split(/\{r|\{R|\{g|\{G|\{b|\{B|\{c|\{C|\{m|\{M|\{y|\{Y|\{x|\{X|\{w|\{W|\{D/g);

    let position = 0; let currentColor;

    return parts.map((string, i) => {
      currentColor = color.map[message.slice(position + i * 2 - 2, position + i * 2)] || color.w;
      position += string.length;
      return currentColor(string);
    });
  }
}

export class ColorPad {
  constructor (startingContent) {
    if (startingContent instanceof Array) {
      this.lines = startingContent.map(str => new ColorMessage(str));
    } else if (typeof startingContent === 'string') {
      this.lines = [new ColorMessage(startingContent)];
    } else {
      this.lines = [];
    } // end if
  }

  addLine (message) {
    this.lines.push(message);
  }
}
