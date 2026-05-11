import React from 'react';

type Props = { title: string; url: string };

export default function ShareButtons({ title, url }: Props) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const links = [
    ['X / Twitter', `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`],
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`],
    ['Bluesky', `https://bsky.app/intent/compose?text=${encodedTitle}%20${encodedUrl}`]
  ];
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(([label, href]) => (
        <a key={label} className="btn" href={href} target="_blank" rel="noreferrer">{label}</a>
      ))}
    </div>
  );
}
