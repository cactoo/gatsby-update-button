import React, { Component } from "react"

const DEFAULT_CHECK_INTERVAL = 60 * 60 * 1000 // 1 hour

export default function withAppUpdatesChecker(
  WrappedComponent,
  { checkInterval = DEFAULT_CHECK_INTERVAL, updateOnLoad = false }
) {
  return class extends Component {
    state = {
      hasUpdate: false,
      updateHandler: null,
    }

    updateInterval = null

    componentDidMount() {
      this.registerServiceWorker()
    }

    componentWillUnmount() {
      if (this.updateInterval) {
        clearInterval(this.updateInterval)
      }
    }

    registerServiceWorker = async () => {
      if (isServer()) return

      const reg = await navigator.serviceWorker.register("/sw.js")

      this.reloadWindowOnControllerChange()
      this.checkForSWUpdate(reg)

      if (!reg) return

      if (reg.waiting) {
        this.updateReady(reg.waiting)

        // If updateOnLoad is true, activate worker on route navigation
        if (updateOnLoad) {
          reg.waiting.postMessage({ type: "SKIP_WAITING" })
        }
      }

      // If "updatefound" event is fired, it means that there's
      // a new service worker being installed.
      reg.addEventListener("updatefound", () => {
        if (reg.installing) {
          this.trackInstalling(reg.installing)
        }
      })
    }

    reloadWindowOnControllerChange = () => {
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        // This fires when the service worker controlling this page
        // changes, eg a new worker has skipped waiting and become
        // the new active worker.
        window.location.reload()
      })
    }

    checkForSWUpdate = registration => {
      this.updateInterval = setInterval(() => {
        registration.update()
      }, checkInterval)
    }

    updateReady = worker => {
      this.setState({
        hasUpdate: true,
        updateHandler: () => {
          // Tell the service worker to skipWaiting
          worker.postMessage({ type: "SKIP_WAITING" })
          this.setState({
            hasUpdate: false,
            updateHandler: null,
          })
        },
      })
    }

    trackInstalling = worker => {
      worker.addEventListener("statechange", () => {
        if (["installed", "waiting"].includes(worker.state)) {
          this.updateReady(worker)
        }
      })
    }

    render() {
      const { hasUpdate, updateHandler } = this.state

      return (
        <WrappedComponent
          hasUpdate={hasUpdate}
          updateHandler={updateHandler}
          {...this.props}
        />
      )
    }
  }
}

function isServer() {
  return (
    typeof window === "undefined" ||
    typeof navigator === "undefined" ||
    !navigator.serviceWorker
  )
}
