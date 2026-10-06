import EmptyState from '../components/EmptyState'
import { localizedCountryName, localizedRegion, useTranslation } from '../i18n'
import type { SearchRecord } from '../types/Country'

interface HistoryProps { history: SearchRecord[]; clearHistory: () => void }

export default function History({ history, clearHistory }: HistoryProps) {
  const { language, t } = useTranslation()
  const locale = language === 'he' ? 'he-IL' : language === 'ar' ? 'ar' : 'en'
  const dateFormatter = new Intl.DateTimeFormat(locale, { dateStyle: 'medium', timeStyle: 'short' })
  return (
    <main className="page-shell inner-page">
      <section className="page-intro"><span className="eyebrow">{t('atlas')}</span><h1>{t('historyTitleOne')}<br /><em>{t('historyTitleTwo')}</em></h1><p>{t('historyDescription')}</p></section>
      <section className="content-panel">
        <div className="panel-heading"><div><span className="eyebrow">{t('explorationLog')}</span><h2>{t('searchHistory')} <span className="count-pill">{history.length}</span></h2></div>{history.length > 0 && <button type="button" className="quiet-button" onClick={clearHistory}>{t('clearHistory')}</button>}</div>
        {history.length === 0 ? <EmptyState icon="◷" title={t('journeyStarts')} description={t('historyEmpty')} /> : (
          <div className="table-wrap"><table><thead><tr><th>{t('searchTime')}</th><th>{t('countryHeading')}</th><th>{t('capitalHeading')}</th><th>{t('regionHeading')}</th></tr></thead><tbody>
            {history.map((record) => <tr key={record.id}><td className="time-cell">{dateFormatter.format(new Date(record.searchedAt))}</td><td className="country-cell">{localizedCountryName(record.cca2 ?? '', record.country, language)}</td><td>{record.capital}</td><td><span className="region-chip">{localizedRegion(record.region, language)}</span></td></tr>)}
          </tbody></table></div>
        )}
      </section>
      <footer className="page-footer"><span>{t('madeCurious')}</span><span>{t('historyStays')}</span></footer>
    </main>
  )
}
