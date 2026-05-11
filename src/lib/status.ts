export function statusLabel(status: string, lang = 'en') {
  const ja: Record<string, string> = {
    draft: '下書き', pending: '審査待ち', needs_changes: '修正依頼あり', approved: '公開中', rejected: '却下', suspended: '停止中',
    official: 'Official', reviewed: 'Reviewed', community: 'Community', unreviewed: 'Unreviewed',
    low: 'Low risk', medium: 'Medium risk', high: 'High risk', unknown: 'Unknown risk'
  };
  const en: Record<string, string> = {
    draft: 'Draft', pending: 'Pending', needs_changes: 'Needs changes', approved: 'Published', rejected: 'Rejected', suspended: 'Suspended',
    official: 'Official', reviewed: 'Reviewed', community: 'Community', unreviewed: 'Unreviewed',
    low: 'Low risk', medium: 'Medium risk', high: 'High risk', unknown: 'Unknown risk'
  };
  return (lang === 'ja' ? ja : en)[status] ?? status;
}
