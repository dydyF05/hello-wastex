import { mountWithProviders } from '@hello-wastex/mocks';
import { Header } from '@hello-wastex/ui';
import { describe, expect, it } from 'vitest';
import App from './App.vue';

describe('App', () => {
  it('renders properly', () => {
    const wrapper = mountWithProviders({ Component: App });
    expect(wrapper.findComponent(Header)).toBeTruthy();
  });
});
