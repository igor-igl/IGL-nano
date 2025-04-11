# Многопоточная система IGL-nano

## Архитектура
- `ThreadManager` - основной класс для управления потоками
- `Worker` - изолированный поток с обработчиком задач
- `SharedMemory` - общая память для межпоточного взаимодействия

## Пример использования
```typescript
import { ThreadManager } from '../runtime/browser/thread-manager';

const manager = new ThreadManager(4); // 4 потока

manager.processTask(data)
  .then(result => console.log(result));