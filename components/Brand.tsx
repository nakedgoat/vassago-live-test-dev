export function Brand({ labs = false }: { labs?: boolean }) {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span>Vassago</span>
      {labs && <small>LABS</small>}
    </span>
  );
}
