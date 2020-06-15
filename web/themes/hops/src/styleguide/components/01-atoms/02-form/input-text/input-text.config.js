module.exports = {
  title: 'Input text',
  body: 'A basic input text',
  notes: 'Best practice is to mention optional fields instead of required ones.',
  preview: '@content-section',
  collated: true,
  context: {
    placeholder: 'Type text',
    isRequired: false
  },
  variants: [
    {
      name: 'Required',
      context: {
        placeholder: 'Type text',
        isRequired: true
      }
    }
  ]
};
