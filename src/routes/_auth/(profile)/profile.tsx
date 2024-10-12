import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/(profile)/profile')({
  component: () => <div>Hello /_auth/(profile)/profile!</div>,
})
