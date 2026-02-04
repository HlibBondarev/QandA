import { FC, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { searchQuestions, QuestionData } from './QuestionsData';
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

export const SearchPage: FC = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      if (!cancelled) {
        setQuestions(foundResults);
      }
    };
    doSearch(search);
    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <Page title="Search Results">
      {search && (
        <p
          css={css`
            font-size: 16px;
            font-style: italic;
            margin-top: 0px;
          `}
        >
          for "{search}"
        </p>
      )}
      <QuestionList data={questions} />
    </Page>
  );
};
