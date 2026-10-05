const floatingFlags = [
  { name: 'Japan', code: 'jp', className: 'backdrop-flag-japan', label: 'JP' },
  { name: 'Brazil', code: 'br', className: 'backdrop-flag-brazil', label: 'BR' },
  { name: 'France', code: 'fr', className: 'backdrop-flag-france', label: 'FR' },
  { name: 'Canada', code: 'ca', className: 'backdrop-flag-canada', label: 'CA' },
  { name: 'Egypt', code: 'eg', className: 'backdrop-flag-egypt', label: 'EG' },
]

export default function WorldBackdrop() {
  return (
    <div className="world-backdrop" aria-hidden="true">
      <div className="backdrop-halo backdrop-halo-one" />
      <div className="backdrop-halo backdrop-halo-two" />
      <div className="backdrop-grid" />
      <div className="backdrop-globe">
        <span className="backdrop-globe-land backdrop-globe-land-one" />
        <span className="backdrop-globe-land backdrop-globe-land-two" />
        <span className="backdrop-globe-land backdrop-globe-land-three" />
        <span className="backdrop-globe-grid backdrop-globe-grid-one" />
        <span className="backdrop-globe-grid backdrop-globe-grid-two" />
      </div>
      {floatingFlags.map((flag) => (
        <div className={`backdrop-flag ${flag.className}`} key={flag.code}>
          <img src={`https://flagcdn.com/w160/${flag.code}.png`} alt="" />
          <span>{flag.name}</span>
          <small>{flag.label}</small>
        </div>
      ))}
    </div>
  )
}
