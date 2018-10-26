const updateState = (updates: object) => (state: object) => ({
  ...state,
  ...updates,
})

export default updateState
