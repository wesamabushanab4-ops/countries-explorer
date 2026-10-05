import type { SearchHistoryItem } from '../types/Country'
import PageHeader from '../components/PageHeader'

type HistoryProps = {
  history: SearchHistoryItem[]
}

export default function History({ history }: HistoryProps) {
  return (
    <section className="page-section">
      <PageHeader
        kicker="Your journey"
        title="Search history"
        description="Places you’ve explored, all in one place."
        variant="history"
      />

      {history.length === 0 ? (
        <div className="empty-state">
          <strong>No searches yet</strong>
          <span>Choose a country to start building your exploration history.</span>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="history-table">
            <thead>
              <tr>
                <th>Search Time</th>
                <th>Country</th>
                <th>Capital</th>
                <th>Region</th>
              </tr>
            </thead>
            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td><span className="history-time">{item.searchTime}</span></td>
                  <td><span className="history-country">{item.country}</span></td>
                  <td>{item.capital}</td>
                  <td><span className="region-chip history-region">{item.region}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
