import React from "react"
import withAppUpdatesChecker from "./withAppUpdatesChecker"

const UPDATE_CHECKING_INTERVAL = 15 * 1000

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
  checkInterval: UPDATE_CHECKING_INTERVAL,
  updateOnLoad: false,
})
