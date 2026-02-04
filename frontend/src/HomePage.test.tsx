import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import { HomePage } from './HomePage';
import { BrowserRouter } from 'react-router-dom';
import * as QuestionData from './QuestionsData'; // Імпортуємо весь модуль як об'єкт

afterEach(cleanup);

test('When HomePage first rendered, loading indicator should show', () => {
  const { getByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );
  const loading = getByText('Loading...');
  expect(loading).not.toBeNull();
});

test('When HomePage data returned, it should render questions', async () => {
  const getUnansweredQuestionsSpy = jest.spyOn(
    QuestionData,
    'getUnansweredQuestions'
  );
  getUnansweredQuestionsSpy.mockResolvedValue([
    {
      questionId: 1,
      title: 'Title1 test',
      content: 'Content2 test',
      userName: 'User1',
      created: new Date(2019, 1, 1),
      answers: [],
    },
    {
      questionId: 2,
      title: 'Title2 test',
      content: 'Content2 test',
      userName: 'User2',
      created: new Date(2019, 1, 1),
      answers: [],
    },
  ]);

  const { getByText } = render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
  );

  // Використовуємо await waitFor() для перевірки появи елемента
  await waitFor(() => {
    const questionTitleText = getByText('Title1 test');
    expect(questionTitleText).toBeInTheDocument();
  });

  const question2TitleText = getByText('Title2 test');
  expect(question2TitleText).not.toBeNull();

  getUnansweredQuestionsSpy.mockRestore();
});
