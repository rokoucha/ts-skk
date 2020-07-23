import {
  AssistiveWindowButton,
  AssistiveWindowProperties,
  AssistiveWindowType,
  MenuItem,
  Segment,
  WindowPosition,
} from '../type'
import { ChromeInputIme } from '../chromeInputIme'
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
} from '../events'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EventMock<T extends (...args: any[]) => void> implements Event<T> {
  private listeners: T[]

  constructor() {
    this.listeners = []
  }

  addListener(callback: T): void {
    this.listeners.push(callback)
  }

  emit(...args: Parameters<T>): void {
    this.listeners.forEach((listener) => listener(...args))
  }
}

export type callback = (success: boolean) => void

export class ChromeInputImeMock implements ChromeInputIme {
  private candidateWindow = {
    auxiliaryText: '',
    auxiliaryTextVisible: false,
    currentCandidateIndex: 0,
    cursorVisible: false,
    pageSize: 10,
    totalCandidates: 0,
    vertical: false,
    visible: false,
    windowPosition: '',
  }
  private candidates: {
    candidate: string
    id: number
    parentId?: number
    label?: string
    annotation?: string
    usage?: { title: string; body: string }
  }[]
  private composition = ''
  private contexts: { id: number }[]
  private cursor = {
    candidate: {
      enable: false,
      selected: 0,
    },
  }
  private engines: { id: string }[]
  private inputViewVisible = false
  private menuItems: MenuItem[]
  private text = ''

  constructor() {
    this.candidates = []
    this.contexts = []
    this.engines = []
    this.menuItems = []
  }

  private getEngine(id: string) {
    return this.engines.find((engine) => engine.id === id)
  }

  private getContext(id: number) {
    return this.contexts.find((context) => context.id === id)
  }

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
  ): void {
    this.clearComposition({ contextID: parameters.contextID })

    if (callback) callback(true)
  }

  clearComposition(
    parameters: { contextID: number },
    callback?: callback,
  ): void {
    this.composition = ''

    if (callback) callback(true)
  }

  commitText(
    parameters: { contextID: number; text: string },
    callback?: callback,
  ): void {
    this.text = parameters.text

    if (callback) callback(true)
  }

  sendKeyEvents(
    parameters: { contextID: number; keyData: KeyboardEvent[] },
    callback?: callback,
  ): void {
    if (callback) callback(true)
  }

  hideInputView(): void {
    this.inputViewVisible = false
  }

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
  ): void {
    this.candidateWindow = {
      auxiliaryText:
        parameters.properties.auxiliaryText ??
        this.candidateWindow.auxiliaryText,
      auxiliaryTextVisible:
        parameters.properties.auxiliaryTextVisible ??
        this.candidateWindow.auxiliaryTextVisible,
      currentCandidateIndex:
        parameters.properties.currentCandidateIndex ??
        this.candidateWindow.currentCandidateIndex,
      cursorVisible:
        parameters.properties.cursorVisible ??
        this.candidateWindow.cursorVisible,
      pageSize: parameters.properties.pageSize ?? this.candidateWindow.pageSize,
      totalCandidates:
        parameters.properties.totalCandidates ??
        this.candidateWindow.totalCandidates,
      vertical: parameters.properties.vertical ?? this.candidateWindow.vertical,
      visible: parameters.properties.visible ?? this.candidateWindow.visible,
      windowPosition:
        parameters.properties.windowPosition ??
        this.candidateWindow.windowPosition,
    }

    if (callback) callback(true)
  }

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
  ): void {
    this.candidates = parameters.candidates

    if (callback) callback(true)
  }

  setCursorPosition(
    parameters: {
      contextID: number
      candidateID: number
    },
    callback?: callback,
  ): void {
    this.cursor.candidate.enable = true
    this.cursor.candidate.selected = parameters.candidateID

    if (callback) callback(true)
  }

  setAssistiveWindowProperties(
    parameters: {
      contextID: number
      properties: AssistiveWindowProperties
    },
    callback?: callback,
  ): void {
    if (callback) callback(true)
  }

  setAssistiveWindowButtonHighlighted(
    parameters: {
      contextID: number
      buttonID: AssistiveWindowButton
      windowType: AssistiveWindowType
      announceString?: string
      highlighted: boolean
    },
    callback?: callback,
  ): void {
    if (callback) callback(true)
  }

  setMenuItems(
    parameters: {
      engineID: string
      items: MenuItem[]
    },
    callback?: callback,
  ): void {
    this.menuItems.concat(parameters.items)

    if (callback) callback(true)
  }

  updateMenuItems(
    parameters: {
      engineID: string
      items: MenuItem[]
    },
    callback?: callback,
  ): void {
    parameters.items.forEach((item) => {
      const index = this.menuItems.findIndex(
        (defined) => defined.id === item.id,
      )
      if (index) this.menuItems[index] = item
    })

    if (callback) callback(true)
  }

  deleteSurroundingText(
    parameters: {
      engineID: string
      contextID: number
      offset: number
      length: number
    },
    callback?: callback,
  ): void {
    if (callback) callback(true)
  }

  keyEventHandled(requestId: string, response: boolean): void {
    return
  }

  onActivate = new EventMock<onActivateCallback>()

  onAssistiveWindowButtonClicked = new EventMock<
    onAssistiveWindowButtonClicked
  >()

  onBlur = new EventMock<onBlurCallback>()

  onCandidateClicked = new EventMock<onCandidateClickedCallback>()

  onDeactivated = new EventMock<onDeactivatedCallback>()

  onFocus = new EventMock<onFocusCallback>()

  onInputContextUpdate = new EventMock<onInputContextUpdateCallback>()

  onKeyEvent = new EventMock<onKeyEventCallback>()

  onMenuItemActivated = new EventMock<onMenuItemActivatedCallback>()

  onReset = new EventMock<onResetCallback>()

  onSurroundingTextChanged = new EventMock<onSurroundingTextChanged>()
}
