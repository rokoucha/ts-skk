export type KeyboardEventType = 'keyup' | 'keydown'
export type KeyboardEvent = {
  type: KeyboardEventType
  requestId?: string
  extensionId?: string
  key: string
  code: string
  keyCode?: number
  altKey?: boolean
  altgrKey?: boolean
  ctrlKey?: boolean
  shiftKey?: boolean
  capsLock?: boolean
}
export type InputContextType =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'number'
  | 'password'
  | 'null'
export type AutoCapitalizeType = 'characters' | 'words' | 'sentences'
export type InputContext = {
  contextID: number
  type: InputContextType
  autoCorrect: boolean
  autoComplete: boolean
  autoCapitalize: AutoCapitalizeType
  spellCheck: boolean
  shouldDoLearning: boolean
}
export type MenuItemStyle = 'check' | 'radio' | 'separator'
export type MenuItem = {
  id: string
  label?: string
  style?: MenuItemStyle
  visible?: boolean
  checked?: boolean
  enabled?: boolean
}
export type UnderlineStyle = 'underline' | 'doubleUnderline' | 'noUnderline'
export type WindowPosition = 'cursor' | 'composition'
export type ScreenType = 'normal' | 'login' | 'lock' | 'secondary-login'
export type MouseButton = 'left' | 'middle' | 'right'
export type AssistiveWindowType = 'undo'
export type AssistiveWindowProperties = {
  type: AssistiveWindowType
  visible: boolean
  announceString?: string
}
export type AssistiveWindowButton = 'undo' | 'addToDictionary'
export type Segment = {
  start: number
  end: number
  style: UnderlineStyle
}
