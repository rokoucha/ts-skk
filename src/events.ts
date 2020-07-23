import {
  AssistiveWindowButton,
  AssistiveWindowType,
  InputContext,
  MouseButton,
  ScreenType,
} from './type'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Event<T extends (...args: any[]) => void> {
  addListener(callback: T): void
  emit(...args: Parameters<T>): void
}

export type onActivateCallback = (engineID: string, screen: ScreenType) => void

export type onDeactivatedCallback = (engineID: string) => void

export type onFocusCallback = (context: InputContext) => void

export type onBlurCallback = (contextID: number) => void

export type onInputContextUpdateCallback = (context: InputContext) => void

export type onKeyEventCallback = (
  engineID: string,
  keyData: KeyboardEvent,
  requestId: string,
) => void

export type onCandidateClickedCallback = (
  engineID: string,
  candidateID: number,
  button: MouseButton,
) => void

export type onMenuItemActivatedCallback = (
  engineID: string,
  name: string,
) => void

export type onSurroundingTextChanged = (
  engineID: string,
  surroundingInfo: {
    text: string
    focus: number
    anchor: number
    offset: number
  },
) => void

export type onResetCallback = (engineID: string) => void

export type onAssistiveWindowButtonClicked = (details: {
  buttonID: AssistiveWindowButton
  windowType: AssistiveWindowType
}) => void
