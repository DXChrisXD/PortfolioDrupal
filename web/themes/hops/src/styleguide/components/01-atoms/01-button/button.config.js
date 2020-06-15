module.exports = {
  title: 'Button',
  body: 'A basic button helper',
  collated: true,
  preview: '@content-section',
  status: 'ready',
  context: {
    text: 'Default',
    tag: 'button',
    class: 'button'
  },
  variants: [
    {
      name: 'Default link',
      context: {
        class: 'button',
        text: 'Default link button',
        tag: 'a'
      }
    },
    {
      name: 'Primary',
      context: {
        class: 'button button--primary',
        text: 'Primary btn',
        tag: 'a'
      }
    }
  ]
};
