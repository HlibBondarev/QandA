import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

global.fetch = jest.fn();

const createFetchResponse = (
  data: any,
  ok = true,
  status = 200,
  contentType = 'application/json'
) => {
  const headers = {
    get: (headerName: string) => {
      if (headerName.toLowerCase() === 'content-type') {
        return contentType;
      }
      return null;
    },
  };

  return {
    ok,
    status,
    headers: headers as Headers, // Приводимо тип headers до Headers (для сумісності)
    json: () => new Promise((resolve) => resolve(data)),
  } as Response; // Приводимо тип до Response
};

test('renders Q&A link', async () => {
  (fetch as jest.Mock).mockResolvedValue(createFetchResponse([]));

  render(<App />);

  await waitFor(() => {
    const qaLinkElement = screen.getByRole('link', { name: /Q & A/i });
    expect(qaLinkElement).toBeInTheDocument();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
