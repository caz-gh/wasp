export const getThoughts = async (args, context) => {
  return context.entities.Thought.findMany({ take: 10 })
}
