import { mockActivePinia } from '@hello-wastex/mocks';
import { useSearchStore } from '.';

describe('Search Store', () => {
  beforeEach(mockActivePinia);

  it('changes query', () => {
    const counter = useSearchStore();
    expect(counter.query).toBe('');
    counter.change('test');
    expect(counter.query).toBe('test');
  });
});
