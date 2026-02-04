# AI Coding Assistant Instructions for Q&A Frontend

## Project Overview

React 19 + TypeScript Q&A application with a focus on emotion-based styling and form-driven interactions. The app enables users to browse, ask, and answer questions through a single-page application with client-side routing.

## Architecture

### Component Structure

- **Page Components**: `HomePage`, `QuestionPage`, `SearchPage`, `AskPage`, `SignInPage` - route-based page containers
- **Reusable Components**: `QuestionList`, `Question`, `AnswerList`, `Answer`, `Field`, `Form`, `Header`, `PageTitle`
- **Styling**: Centralized in `Styles.ts` using emotion's styled components and color palette constants

### Data Flow

- **No backend integration yet**: `QuestionsData.ts` provides mock data and async functions (`getUnansweredQuestions`, `getQuestion`, `postQuestion`, `postAnswer`, `searchQuestions`)
- Mock data is in-memory; changes persist only during session
- All data functions use `await wait(500)` to simulate API latency - **do not remove or modify these delays**

### Form Pattern (Critical)

Use the custom form system in `Form.tsx` with `FormContext` for all form-based features:

- `Form` component wraps input fields and manages validation, error handling, and submission
- `Field` component (reusable input/textarea) connects to `FormContext` via `useContext`
- Validation: Pass `validationRules` prop to `Form` with validators like `required`, `minLength(50)`, `email`
- Example: [Form.tsx](Form.tsx#L1) shows the complete pattern

### Styling Approach

- **Emotion JSX pragma**: All components use `/** @jsxRuntime classic */` and `/** @jsx jsx */` with `import { css, jsx }` from `@emotion/react`
- **No className usage**: Styling is entirely inline via `css={}` template literals
- **Color palette**: Use exported constants from [Styles.ts](Styles.ts) (`gray1-6`, `primary1-2`, `accent1-2`) - do not hardcode colors
- **Styled components**: `PrimaryButton` and similar reusable styled elements in [Styles.ts](Styles.ts)

## Key Patterns

### 1. React Router Integration

- Routes defined in [App.tsx](App.tsx)
- Use `useNavigate()` from `react-router-dom` for programmatic navigation
- Lazy load `AskPage` with Suspense fallback (see [App.tsx](App.tsx#L14-L28))

### 2. Async Data Loading

- Use `useEffect` with empty dependency array for initial data fetch (see [HomePage.tsx](HomePage.tsx#L11-L23))
- Always manage loading state separately: `const [questionsLoading, setQuestionsLoading] = useState(true)`
- Display loading UI while data is being fetched

### 3. Custom List Rendering

- `QuestionList` accepts optional `renderItem` prop to customize list item rendering
- Default renders `Question` component; override for custom layouts (see [QuestionList.tsx](QuestionList.tsx))

## Development Workflow

### Scripts

- `npm start` - Dev server at http://localhost:3000
- `npm test` - Run tests (using React Testing Library)
- `npm run build` - Production build
- `npm run eject` - ⚠️ One-way operation; use only if custom webpack config needed

### Key Dependencies

- **React 19.2** with TypeScript strict mode (`"strict": true` in tsconfig.json)
- **React Router v6** for SPA routing
- **Emotion 11** for CSS-in-JS styling (not CSS Modules or Tailwind)
- **React Testing Library** for component tests
- **Prettier + ESLint** pre-configured

## Testing

- Test files use `*.test.tsx` naming convention
- Setup in [setupTests.ts](setupTests.ts)
- Follow React Testing Library best practices (query by role/label, not CSS classes)

## Important Conventions

1. **Type strict components**: All components are `React.FC<Props>` with explicit prop interfaces
2. **No external state management**: Use `useState` and `useContext` only - no Redux/Zustand
3. **Comments for JSX pragma**: Required for emotion's JSX syntax (do not remove)
4. **Date handling**: All dates are `Date` objects; format with `.toLocaleDateString()` for display
5. **Integer Math**: Use `Math.max(...array.map(x => x.id))` pattern for ID generation in mock data

## When Adding Features

- New pages: Create in `src/`, add route in `App.tsx` Routes
- New form-based features: Extend [Form.tsx](Form.tsx) validators or create reusable Field variants
- Styling tweaks: Export constants from [Styles.ts](Styles.ts) before using in components
- Form fields: Always use the `Field` component + `FormContext` pattern for consistency
