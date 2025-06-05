export const getCliArgs = argv =>
  argv.reduce((acc, arg) => {
    // Accepts --xxx=xxx and --xxx arguments format
    const match = new RegExp(/^--([^=]+)(?:=(.+))?$/).exec(arg)
    if (match) {
      const [, argument, value] = match
      return { ...acc, [argument]: value ?? true }
    }
    return acc
  }, {})
