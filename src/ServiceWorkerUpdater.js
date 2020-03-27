const DEFAULT_CHECK_INTERVAL = 60 * 60 * 1000 // 1 hour

export default class ServiceWorkerUpdater {
  updateInterval = null

  constructor(
    setUpdateHandler,
    { checkInterval = DEFAULT_CHECK_INTERVAL, updateOnLoad = false }
  ) {
    this.setUpdateHandler = setUpdateHandler
    this.checkInterval = checkInterval
    this.updateOnLoad = updateOnLoad
    console.log({ checkInterval })

    this.registerServiceWorker()
  }

  registerServiceWorker = async () => {
    console.log("registerSW")
    if (isServer()) return

    const reg = await navigator.serviceWorker.register("/sw.js")

    this._reloadWindowOnControllerChange()
    this._checkForSWUpdate(reg)

    if (!reg) return

    if (reg.waiting) {
      this._updateReady(reg.waiting)

      // If updateOnLoad is true, activate worker on route navigation
      if (this.updateOnLoad) {
        reg.waiting.postMessage({ type: "SKIP_WAITING" })
      }
    }

    // If "updatefound" event is fired, it means that there's
    // a new service worker being installed.
    reg.addEventListener("updatefound", () => {
      if (reg.installing) {
        this._trackInstalling(reg.installing)
      }
    })
  }

  _reloadWindowOnControllerChange = () => {
    console.log("reloadWindowOnControllerChange")
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("controllerChange")
      // This fires when the service worker controlling this page
      // changes, eg a new worker has skipped waiting and become
      // the new active worker.
      window.location.reload()
    })
  }

  _checkForSWUpdate = registration => {
    console.log("checkForSWUpdate")
    this.updateInterval = setInterval(() => {
      registration.update()
    }, this.checkInterval)
  }

  _updateReady = worker => {
    console.log("_updateReady")
    this.setUpdateHandler(() => {
      console.log("RUNNING updateHandler")
      // Tell the service worker to skipWaiting
      worker.postMessage({ type: "SKIP_WAITING" })
      this.setUpdateHandler(null)
    })
  }

  _trackInstalling = worker => {
    console.log("_trackInstalling")
    worker.addEventListener("statechange", () => {
      if (["installed", "waiting"].includes(worker.state)) {
        this._updateReady(worker)
      }
    })
  }

  doCleanup = () => {
    console.log("doCleanup")
    clearInterval(this.checkInterval)
  }
}

function isServer() {
  return (
    typeof window === "undefined" ||
    typeof navigator === "undefined" ||
    !navigator.serviceWorker
  )
}
