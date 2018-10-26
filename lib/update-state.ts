const updateState = (updates: object) => (state: object) => ({
  ...state,
  ...updates,
})

export default updateState

export function handleInputChangeToStateUpdate(key: string) {
  return (e: React.ChangeEvent<HTMLInputElement>) => this.setState(updateState({[key]: e.target.value}))
}
