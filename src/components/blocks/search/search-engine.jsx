import React, { useState, useEffect } from 'react';
import { buildClient } from '@datocms/cma-client-browser';
import { useSiteSearch } from 'react-datocms';
import CustomLink from '../../utils/custom-link';
import Spinner from '../spinner/spinner';

import './styles.scss';

const client = buildClient({ apiToken: process.env.DATO_API_TOKEN });
console.log('API', process.env.DATO_API_TOKEN);

export default function SearchEngine({ searchEngineVisible, setSearchEngineVisible }) {
  const [query, setQuery] = useState('');

  const { state, error, data } = useSiteSearch({
    client,
    buildTriggerId: '32428',
    resultsPerPage: 10,
  });

  useEffect(() => {
    if (!searchEngineVisible) {
      setQuery('');
      state.setQuery('');
    }
  }, [searchEngineVisible]);

  useEffect(() => {
    state.setQuery(query);
  }, [query]);

  return (
    <div className={`search-engine ${searchEngineVisible ? 'search-engine--visible' : null}`}>
      <header>

        {/* Close icon */}
        <div className="search-engine__close-icon" onClick={() => setSearchEngineVisible((prev) => !prev)}>
          <span>Close</span>

          <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" viewBox="0 0 38 38" fill="none">
            <g clip-path="url(#clip0_378_1056)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M18.9999 21.2389L27.9568 30.1958C28.2555 30.4842 28.6554 30.6438 29.0706 30.6402C29.4857 30.6366 29.8828 30.4701 30.1764 30.1765C30.4699 29.883 30.6365 29.4859 30.6401 29.0707C30.6437 28.6556 30.4841 28.2556 30.1957 27.957L21.2388 19.0001L30.1957 10.0432C30.4841 9.74454 30.6437 9.34458 30.6401 8.92944C30.6365 8.51429 30.4699 8.11717 30.1764 7.82361C29.8828 7.53005 29.4857 7.36353 29.0706 7.35992C28.6554 7.35632 28.2555 7.51591 27.9568 7.80432L18.9999 16.7612L10.043 7.80432C9.74304 7.52304 9.34541 7.36949 8.93425 7.37616C8.52308 7.38284 8.13064 7.54922 7.83997 7.8401C7.5493 8.13098 7.3832 8.52353 7.37681 8.9347C7.37043 9.34587 7.52426 9.74339 7.80576 10.0432L16.7611 19.0001L7.80417 27.957C7.65295 28.103 7.53233 28.2778 7.44935 28.4709C7.36637 28.6641 7.32269 28.8719 7.32086 29.0821C7.31903 29.2923 7.35909 29.5008 7.43871 29.6954C7.51832 29.89 7.63588 30.0668 7.78455 30.2154C7.93321 30.3641 8.10999 30.4817 8.30458 30.5613C8.49917 30.6409 8.70766 30.681 8.91789 30.6791C9.12813 30.6773 9.33589 30.6336 9.52906 30.5506C9.72224 30.4677 9.89695 30.347 10.043 30.1958L18.9999 21.2389Z"
                fill="#262827"
              />
            </g>
            <defs>
              <clipPath id="clip0_378_1056">
                <rect width="38" height="38" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </header>

      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <input
            id="search-input"
            placeholder="Search"
            autoComplete="off"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" class="btn-submit"></button>
        </form>

        <div className="spinner">{!data && !error && <Spinner />}</div>

        {error && <p>Error! {error}</p>}

        {data && data.pageResults.length > 0 && (
          <div className="search-engine__results search-engine__results--active">
            <ul className="search-engine__results-list">
              {data.pageResults.map((result, index) => (
                <SearchItem key={index} item={result} />
              ))}
            </ul>
          </div>
        )}

        {data && data.pageResults.length == 0 && query.length > 0 && (
          <p className="search-engine__message">Sorry, no results found. Try a different search</p>
        )}
      </div>
    </div>
  );
}

const SearchItem = ({ item }) => {
  return (
    <li className="search-engine__results-item">
      <CustomLink to={item.url}>
        <h6>{item.title || 'Test title'}</h6>
        <p>{item.bodyExcerpt || item.raw.attributes.body_excerpt}</p>
      </CustomLink>
    </li>
  );
};
