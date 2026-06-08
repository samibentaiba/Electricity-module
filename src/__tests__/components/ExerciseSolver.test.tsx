import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ExerciseSolver } from '@/components/ui/ExerciseSolver';

// Mock next/dynamic since it's used heavily in exercise files
vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: () => {
    const MockComponent = () => <div data-testid="mock-dynamic" />;
    MockComponent.displayName = 'MockDynamic';
    return MockComponent;
  },
}));

describe('ExerciseSolver', () => {
  const defaultProps = {
    title: 'Exercise 1: Test Title',
    statement: <p data-testid="statement">This is the exercise statement.</p>,
    aiExplanation: <div data-testid="ai-explanation">AI explanation content here.</div>,
    examSolution: <div data-testid="exam-solution">Formal exam solution here.</div>,
  };

  it('renders the exercise title', () => {
    render(<ExerciseSolver {...defaultProps} />);
    expect(screen.getByText('Exercise 1: Test Title')).toBeDefined();
  });

  it('renders the exercise statement', () => {
    render(<ExerciseSolver {...defaultProps} />);
    expect(screen.getByTestId('statement')).toBeDefined();
  });

  it('shows AI Explanation tab by default', () => {
    render(<ExerciseSolver {...defaultProps} />);
    expect(screen.getByTestId('ai-explanation')).toBeDefined();
  });

  it('does NOT show exam solution tab by default', () => {
    render(<ExerciseSolver {...defaultProps} />);
    expect(screen.queryByTestId('exam-solution')).toBeNull();
  });

  it('switches to exam solution tab on click', () => {
    render(<ExerciseSolver {...defaultProps} />);
    const examBtn = screen.getByText('Formal Exam Solution');
    fireEvent.click(examBtn);
    expect(screen.getByTestId('exam-solution')).toBeDefined();
    expect(screen.queryByTestId('ai-explanation')).toBeNull();
  });

  it('switches back to AI tab from exam tab', () => {
    render(<ExerciseSolver {...defaultProps} />);
    // Switch to exam
    fireEvent.click(screen.getByText('Formal Exam Solution'));
    expect(screen.getByTestId('exam-solution')).toBeDefined();
    // Switch back to AI
    fireEvent.click(screen.getByText('AI Explained & Interactive Simulation'));
    expect(screen.getByTestId('ai-explanation')).toBeDefined();
    expect(screen.queryByTestId('exam-solution')).toBeNull();
  });

  it('renders visualization inside AI tab when provided', () => {
    const visualization = <div data-testid="visualization">Interactive viz</div>;
    render(<ExerciseSolver {...defaultProps} visualization={visualization} />);
    // AI tab is default, visualization should be inside it
    expect(screen.getByTestId('visualization')).toBeDefined();
  });

  it('does NOT render visualization when not provided', () => {
    render(<ExerciseSolver {...defaultProps} />);
    expect(screen.queryByTestId('visualization')).toBeNull();
  });

  it('visualization stays hidden when exam tab is active', () => {
    const visualization = <div data-testid="visualization">Interactive viz</div>;
    render(<ExerciseSolver {...defaultProps} visualization={visualization} />);
    fireEvent.click(screen.getByText('Formal Exam Solution'));
    expect(screen.queryByTestId('visualization')).toBeNull();
  });

  it('renders only 2 tab buttons (no separate visualization tab)', () => {
    const visualization = <div data-testid="visualization">Interactive viz</div>;
    render(<ExerciseSolver {...defaultProps} visualization={visualization} />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });
});
