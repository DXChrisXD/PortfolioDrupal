module.exports = {
  title: 'Input Submit',
  body: 'A basic submit button',
  collated: true,
  preview: '@content-section',
  status: 'ready',
  context: {
    class: 'button',
    value: 'Default Submit'
  },
  variants: [
    {
      name: 'Primary action submit',
      context: {
        class: 'button button--primary',
        value: 'Primary action submit'
      }
    }
  ]
};
