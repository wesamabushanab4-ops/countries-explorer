interface EmptyStateProps {
  icon: string
  title: string
  description: string
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <span className="empty-icon" aria-hidden="true">{icon}</span>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}
