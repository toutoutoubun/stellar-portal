insert into public.wiki_pages (slug, locale, title, body, status, published_at) values
('getting-started', 'en', 'Getting started', 'Install Stellar, create a local vault, and begin collecting papers, notes, highlights, graphs, and analysis.', 'published', now()),
('getting-started', 'ja', 'はじめに', 'Stellarを導入し、ローカルの研究保管庫を作り、文献・ノート・ハイライト・グラフ・分析をつなげていくための入口です。', 'published', now()),
('addon-safety', 'en', 'Addon safety', 'Community addons are reviewed before listing. Review does not mean official maintenance by the Stellar core project.', 'published', now()),
('addon-safety', 'ja', 'アドオンの安全性', 'コミュニティ投稿アドオンは掲載前に審査されます。ただし、審査済みであることはStellar本体の公式保守対象であることを意味しません。', 'published', now())
on conflict (slug, locale) do update set title = excluded.title, body = excluded.body, status = excluded.status, published_at = excluded.published_at;
