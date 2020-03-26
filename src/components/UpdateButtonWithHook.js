import React from "react"
import useSWUpdateChecker from "./useSWUpdateChecker"

const CHECK_INTERVAL = 15 * 1000 // 15s
const UPDATE_ON_LOAD = false

function UpdateButton() {
  const [hasUpdate, updateHandler] = useSWUpdateChecker({
    checkInterval: CHECK_INTERVAL,
    updateOnLoad: UPDATE_ON_LOAD,
  })

  console.log("@@@@@@@@@@@", { hasUpdate, updateHandler })

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
