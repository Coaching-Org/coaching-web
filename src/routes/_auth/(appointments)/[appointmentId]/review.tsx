import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_auth/(appointments)/[appointmentId]/review',
)({
  component: () => ReviewLayout,
})

function ReviewLayout() {
  return (
    <div className="gap-4 p-4 lg:gap-6 lg:p-6">
      <Card className="m-4">
        <CardHeader>
          <CardTitle>Course Review</CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
