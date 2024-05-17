import { mountWithProviders } from '@hello-wastex/mocks';
import { describe, expect, it } from 'vitest';
import App from './App.vue';

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mountWithProviders({ Component: App });
    expect(wrapper.text()).toContain('Welcome');
  });
});
