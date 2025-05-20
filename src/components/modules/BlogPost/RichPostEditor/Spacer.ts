export default class SpacerBlock {
  static get toolbox() {
    return {
      title: 'Spacer',
      icon: '<svg width="18" height="18"><line x1="2" y1="9" x2="16" y2="9" stroke="black" stroke-width="2"/></svg>',
    };
  }

  render() {
    const div = document.createElement('div');
    div.style.height = '50px'; // Default spacer height
    div.style.width = '100%';
    div.style.background = 'transparent';
    return div;
  }

  save() {
    return {};
  }
}
