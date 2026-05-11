import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

type StructureCardProps = {
  title: string
  description: string
}

export function StructureCard({ title, description }: StructureCardProps) {
  return (
    <Card className="border-white/60 bg-white/80 shadow-[0_20px_45px_rgba(15,23,42,0.08)] backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="font-display text-lg tracking-tight text-slate-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-slate-600">{description}</p>
      </CardContent>
    </Card>
  )
}
