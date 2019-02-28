const doc = document

export default (value) => {
  const textarea = doc.createElement('textarea')

  textarea.value = value
  textarea.selectionStart = 0
  textarea.selectionEnd = textarea.value.length

  const s = textarea.style

  s.position = 'fixed'
  s.left = '-100%'

  doc.body.appendChild(textarea)
  textarea.focus()

  const isSuccess = doc.execCommand('copy')

  textarea.blur()
  doc.body.removeChild(textarea)

  return isSuccess
}
