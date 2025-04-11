import { ThreadManager } from '../../runtime/browser/thread-manager';
import { setTimeout } from 'timers/promises';

describe('ThreadManager', () => {
  it('должен обрабатывать параллельные задачи', async () => {
    const manager = new ThreadManager();
    const results = await Promise.all([
      manager.processTask({ data: [1, 2, 3] }),
      manager.processTask({ data: [4, 5, 6] }),
      setTimeout(100).then(() => manager.processTask({ test: true }))
    ]);
    
    expect(results).toMatchSnapshot();
  });
});
