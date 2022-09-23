import { useState, useEffect, useRef, LinkHTMLAttributes } from 'react';
import { unescape } from 'html-escaper';
import './TableOfContents.css';

interface Props {
	headings: { depth: number; slug: string; text: string }[];
	labels: {
		onThisPage: string;
		overview: string;
	};
	isMobile?: boolean;
}

export default function TableOfContents ({ headings = [], labels, isMobile } : Props) {
  headings = [{ depth: 2, slug: 'overview', text: labels.overview }, ...headings].filter(
		({ depth }) => depth > 1 && depth < 5
	);
	const toc = useRef<HTMLUListElement>(null);
	const [currentID, setCurrentID] = useState('overview');
	const [open, setOpen] = useState(!isMobile);
	const onThisPageID = 'on-this-page-heading';

  const Container = ({ children } : { children : JSX.Element }) => {
		return isMobile ? (
			<details {...{ open }} onToggle={(preOpen) => setOpen(!preOpen)} className="toc-mobile-container">
				{children}
			</details>
		) : (
			children
		);
	};

  const HeadingContainer = ({ children } : { children : JSX.Element }) => {
		const currentHeading = headings.find(({ slug }) => slug === currentID);
		return isMobile ? (
			<summary className="toc-mobile-header">
				<div className="toc-mobile-header-content">
					<div className="toc-toggle">
						{children}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 1 16 16"
							width="16"
							height="16"
							aria-hidden="true"
						>
							<path
								fillRule="evenodd"
								d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
							></path>
						</svg>
					</div>
					{!open && currentHeading?.slug !== 'overview' && (
						<span className="toc-current-heading">{unescape(currentHeading?.text || '')}</span>
					)}
				</div>
			</summary>
		) : (
			children
		);
	};

  useEffect(() => {
		if (!toc.current) return;

		const setCurrent: IntersectionObserverCallback = (entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					const { id } = entry.target;
					if (id === onThisPageID) continue;
					setCurrentID(id);
					break;
				}
			}
		};

		const observerOptions: IntersectionObserverInit = {
			// Negative top margin accounts for `scroll-margin`.
			// Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
			rootMargin: '-20px 0% -56%',
			threshold: 1,
		};

		const headingsObserver = new IntersectionObserver(setCurrent, observerOptions);

		// Observe all the headings in the main page content.
		document.querySelectorAll('article :is(h1,h2,h3,h4), #parallax :is(h1)').forEach((h) => headingsObserver.observe(h));

		// Stop observing when the component is unmounted.
		return () => headingsObserver.disconnect();
	}, [toc.current]);

	const onLinkClick = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
		if (!isMobile) return;
		setOpen(false);
		setCurrentID(target.getAttribute('href')!.replace('#', ''));
	};

	return (
		<Container>
      <>
        <HeadingContainer>
          <h2 className="heading" id={onThisPageID}>
            {labels.onThisPage}
          </h2>
        </HeadingContainer>
        <ul ref={toc}>
          {headings.map(({ depth, slug, text }) => (
            <li
              className={`header-link depth-${depth} ${
                currentID === slug ? 'current-header-link' : ''
              }`.trim()}
              key={slug}
            >
              <a href={`#${slug}`} onClick={onLinkClick}>
                {unescape(text)}
              </a>
            </li>
          ))}
        </ul>
      </>
		</Container>
	);
}
