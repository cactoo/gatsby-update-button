import React from "react"
import { withSWUpdateChecker } from "service-worker-updater"

const CHECK_INTERVAL = 15 * 1000
const UPDATE_ON_LOAD = true

function UpdateButton({ hasUpdate, updateHandler }) {
  if (!hasUpdate) return null

  return (
    <button
      className="updateButton"
      onClick={() => {
        updateHandler()
      }}
    >
      Update app
    </button>
  )
}

export default withSWUpdateChecker(UpdateButton, {
  checkInterval: CHECK_INTERVAL,
  updateOnLoad: UPDATE_ON_LOAD,
})
