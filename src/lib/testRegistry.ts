export interface TestMetadata {
  id: string;
  title: string;
  subtitle: string;
  exercises: {
    id: number;
    label: string;
    title: string;
    componentName: string;
  }[];
}

export const testRegistry: TestMetadata[] = [
  {
    id: "test1-vague1",
    title: "Test 1 — Vague 1",
    subtitle: "Matrix Rank, Invertibility & Linear Systems",
    exercises: [
      { id: 1, label: "Exercise 1", title: "True/False Justifications", componentName: "Test1_V1_Ex1" },
      { id: 2, label: "Exercise 2", title: "Matrix & System", componentName: "Test1_V1_Ex2" },
    ],
  },
  {
    id: "test1-vague2",
    title: "Test 1 — Vague 2",
    subtitle: "Matrix Rank, Invertibility & Linear Systems",
    exercises: [
      { id: 1, label: "Exercise 1", title: "True/False Justifications", componentName: "Test1_V2_Ex1" },
      { id: 2, label: "Exercise 2", title: "Matrix & System", componentName: "Test1_V2_Ex2" },
    ],
  },
  {
    id: "test1-vague3",
    title: "Test 1 — Vague 3",
    subtitle: "Matrix Rank, Invertibility & Linear Systems",
    exercises: [
      { id: 1, label: "Exercise 1", title: "True/False Justifications", componentName: "Test1_V3_Ex1" },
      { id: 2, label: "Exercise 2", title: "Matrix & System", componentName: "Test1_V3_Ex2" },
    ],
  },
  {
    id: "test1-vague5-q3",
    title: "Test 1 — Vague 5",
    subtitle: "Question 3 Only — Vector Subspaces",
    exercises: [
      { id: 1, label: "Question 3", title: "Vector Subspaces & Direct Sum", componentName: "Test1_V5_Q3" },
    ],
  },
  {
    id: "test2-vague1",
    title: "Test 2 — Vague 1",
    subtitle: "Vector Spaces, Subspaces & Basis",
    exercises: [
      { id: 1, label: "Exercise 1", title: "Subspace Verification & Dimension", componentName: "Test2_V1_Ex1" },
      { id: 2, label: "Exercise 2", title: "Basis & Direct Sum", componentName: "Test2_V1_Ex2" },
    ],
  },
  {
    id: "test2-vague4",
    title: "Test 2 — Vague 4",
    subtitle: "Vector Spaces, Subspaces & Basis",
    exercises: [
      { id: 1, label: "Exercise 1", title: "Subspace & Linear Combinations", componentName: "Test2_V4_Ex1" },
      { id: 2, label: "Exercise 2", title: "Dimension & Direct Sum", componentName: "Test2_V4_Ex2" },
    ],
  },
];
