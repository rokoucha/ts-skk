import { SKK } from './skk'

declare global {
  interface Window {
    tsskk: SKK
  }
}

;(() => {
  window.tsskk = new SKK()

  return
})()
