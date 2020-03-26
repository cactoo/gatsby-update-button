import React from "react"
import withAppUpdatesChecker from "./withSWUpdateChecker"

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

export default withAppUpdatesChecker(UpdateButton, {
  checkInterval: CHECK_INTERVAL,
  updateOnLoad: UPDATE_ON_LOAD,
})
