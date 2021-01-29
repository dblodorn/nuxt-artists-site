import globals from '~/globals.json'

export default (context, inject) => {
  const global = {
    ...globals,
    nav: [
      'Music',
      'Photos',
      'Bio'
    ]
  }
  inject('global', global)
  context.$global = global
}