export const createThought = async (args, context) => {
  return context.entities.Thought.create({
    data: { text: args.text }
  })
}
