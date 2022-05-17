export * from './data-model';
export * from './unit';

export const delay = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
};
