module.exports = {
  title: 'Example UI pattern',
  preview: '@preview',
  status: 'wip',
  context: {
    title: 'Example component title',
    text: '<p>Example component text.</p>',
    image: '<img src="https://placekitten.com/160/90" alt="">'
  },
  variants: [
    {
      name: "Highlighted",
      context: {
        modifier: "highlighted"
      }
    }
  ]
};
