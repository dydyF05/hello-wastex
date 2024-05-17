import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { Component as VueComponent } from 'vue';

/**
 * Unify the way we mount component with every provider the app needs
 * @param VueComponent
 * @returns
 */
export const mountWithProviders = ({
  Component,
}: {
  Component: VueComponent;
}) =>
  mount(Component, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

/**
 * Sets active pinia for functions using by any means pinia
 */
export const mockActivePinia = () => {
  // creates a fresh pinia and makes it active
  // so it's automatically picked up by any useStore() call
  // without having to pass it to it: `useStore(pinia)`
  setActivePinia(createPinia());
};
