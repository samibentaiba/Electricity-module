import { describe, it, expect } from 'vitest';
import { testRegistry } from '@/lib/testRegistry';

describe('testRegistry', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(testRegistry)).toBe(true);
    expect(testRegistry.length).toBeGreaterThan(0);
  });

  it('contains all 6 expected test variants', () => {
    const expectedIds = [
      'test1-vague1',
      'test1-vague2',
      'test1-vague3',
      'test1-vague5-q3',
      'test2-vague1',
      'test2-vague4',
    ];
    const ids = testRegistry.map(t => t.id);
    for (const id of expectedIds) {
      expect(ids).toContain(id);
    }
  });

  it('every test has required fields', () => {
    for (const test of testRegistry) {
      expect(test.id).toBeTruthy();
      expect(test.title).toBeTruthy();
      expect(test.subtitle).toBeTruthy();
      expect(Array.isArray(test.exercises)).toBe(true);
      expect(test.exercises.length).toBeGreaterThan(0);
    }
  });

  it('every exercise within a test has required fields', () => {
    for (const test of testRegistry) {
      for (const ex of test.exercises) {
        expect(typeof ex.id).toBe('number');
        expect(ex.label).toBeTruthy();
        expect(ex.title).toBeTruthy();
        expect(ex.componentName).toBeTruthy();
      }
    }
  });

  it('all componentName values are unique across the registry', () => {
    const names = testRegistry.flatMap(t => t.exercises.map(e => e.componentName));
    const unique = new Set(names);
    expect(unique.size).toBe(names.length);
  });

  it('componentName values follow expected naming conventions', () => {
    const names = testRegistry.flatMap(t => t.exercises.map(e => e.componentName));
    for (const name of names) {
      // Should match Test{N}_V{N}_Ex{N} or Test{N}_V{N}_Q{N}
      expect(name).toMatch(/^Test\d+_V\d+_(Ex|Q)\d+$/);
    }
  });

  describe('Test 1 variants', () => {
    it('test1-vague1 has 2 exercises', () => {
      const test = testRegistry.find(t => t.id === 'test1-vague1');
      expect(test).toBeDefined();
      expect(test!.exercises).toHaveLength(2);
    });

    it('test1-vague2 has 2 exercises', () => {
      const test = testRegistry.find(t => t.id === 'test1-vague2');
      expect(test).toBeDefined();
      expect(test!.exercises).toHaveLength(2);
    });

    it('test1-vague3 has 2 exercises', () => {
      const test = testRegistry.find(t => t.id === 'test1-vague3');
      expect(test).toBeDefined();
      expect(test!.exercises).toHaveLength(2);
    });

    it('test1-vague5-q3 has 1 exercise', () => {
      const test = testRegistry.find(t => t.id === 'test1-vague5-q3');
      expect(test).toBeDefined();
      expect(test!.exercises).toHaveLength(1);
    });
  });

  describe('Test 2 variants', () => {
    it('test2-vague1 has 2 exercises', () => {
      const test = testRegistry.find(t => t.id === 'test2-vague1');
      expect(test).toBeDefined();
      expect(test!.exercises).toHaveLength(2);
    });

    it('test2-vague4 has 2 exercises', () => {
      const test = testRegistry.find(t => t.id === 'test2-vague4');
      expect(test).toBeDefined();
      expect(test!.exercises).toHaveLength(2);
    });
  });
});
