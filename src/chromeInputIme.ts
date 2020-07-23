import {
  AssistiveWindowButton,
  AssistiveWindowProperties,
  AssistiveWindowType,
  MenuItem,
  Segment,
  WindowPosition,
} from './type'
import {
  Event,
  onActivateCallback,
  onAssistiveWindowButtonClicked,
  onBlurCallback,
  onCandidateClickedCallback,
  onDeactivatedCallback,
  onFocusCallback,
  onInputContextUpdateCallback,
  onKeyEventCallback,
  onMenuItemActivatedCallback,
  onResetCallback,
  onSurroundingTextChanged,
} from './events'

type callback = (success: boolean) => void

export interface ChromeInputIme {
  setComposition(
    parameters: {
      contextID: number
      text: string
      selectionStart?: number
      selectionEnd?: number
      cursor: number
      segments?: Segment
    },
    callback?: callback,
  ): void

  clearComposition(parameters: { contextID: number }, callback?: callback): void

  commitText(
    parameters: { contextID: number; text: string },
    callback?: callback,
  ): void

  sendKeyEvents(
    parameters: { contextID: number; keyData: KeyboardEvent[] },
    callback?: callback,
  ): void

  hideInputView(): void

  setCandidateWindowProperties(
    parameters: {
      contextID: number
      properties: {
        visible?: boolean
        cursorVisible?: boolean
        vertical?: boolean
        pageSize?: number
        auxiliaryText?: string
        auxiliaryTextVisible?: boolean
        totalCandidates?: number
        currentCandidateIndex?: number
        windowPosition?: WindowPosition
      }
    },
    callback?: callback,
  ): void

  setCandidates(
    parameters: {
      contextID: number
      candidates: {
        candidate: string
        id: number
        parentId?: number
        label?: string
        annotation?: string
        usage?: { title: string; body: string }
      }[]
    },
    callback?: callback,
  ): void

  setCursorPosition(
    parameters: {
      contextID: number
      candidateID: number
    },
    callback?: callback,
  ): void

  setAssistiveWindowProperties(
    parameters: {
      contextID: number
      properties: AssistiveWindowProperties
    },
    callback?: callback,
  ): void

  setAssistiveWindowButtonHighlighted(
    parameters: {
      contextID: number
      buttonID: AssistiveWindowButton
      windowType: AssistiveWindowType
      announceString?: string
      highlighted: boolean
    },
    callback?: callback,
  ): void

  setMenuItems(
    parameters: {
      engineID: string
      items: MenuItem[]
    },
    callback?: callback,
  ): void

  updateMenuItems(
    parameters: {
      engineID: string
      items: MenuItem[]
    },
    callback?: callback,
  ): void

  deleteSurroundingText(
    parameters: {
      engineID: string
      contextID: number
      offset: number
      length: number
    },
    callback?: callback,
  ): void

  keyEventHandled(requestId: string, response: boolean): void

  // Events
  onActivate: Event<onActivateCallback>

  onDeactivated: Event<onDeactivatedCallback>

  onFocus: Event<onFocusCallback>

  onBlur: Event<onBlurCallback>

  onInputContextUpdate: Event<onInputContextUpdateCallback>

  onKeyEvent: Event<onKeyEventCallback>

  onCandidateClicked: Event<onCandidateClickedCallback>

  onMenuItemActivated: Event<onMenuItemActivatedCallback>

  onSurroundingTextChanged: Event<onSurroundingTextChanged>

  onReset: Event<onResetCallback>

  onAssistiveWindowButtonClicked: Event<onAssistiveWindowButtonClicked>
}

declare global {
  interface Window {
    chrome: {
      input: {
        ime: ChromeInputIme
      }
    }
  }
}
