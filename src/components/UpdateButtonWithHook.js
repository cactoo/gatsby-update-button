import React from "react"
import { useSWUpdateChecker } from "service-worker-updater"

const CHECK_INTERVAL = 15 * 1000 // 15s
const UPDATE_ON_LOAD = false

function UpdateButton() {
  const [hasUpdate, updateHandler] = useSWUpdateChecker({
    checkInterval: CHECK_INTERVAL,
    updateOnLoad: UPDATE_ON_LOAD,
  })

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

export default UpdateButton
