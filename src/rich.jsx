// Renders "*word*" segments as <strong>, everything else as plain text.
export function Rich({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? <strong key={i}>{part.slice(1, -1)}</strong> : part,
  )
}
