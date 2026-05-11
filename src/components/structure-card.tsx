type StructureCardProps = {
  title: string
  description: string
}

export function StructureCard({ title, description }: StructureCardProps) {
  return (
    <article className="structure-card">
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}
