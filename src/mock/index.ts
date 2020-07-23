import '../chromeInputIme'
import { ChromeInputImeMock } from './chromeInputImeMock'

window.chrome = { input: { ime: new ChromeInputImeMock() } }

import '../extension/main.ts'
