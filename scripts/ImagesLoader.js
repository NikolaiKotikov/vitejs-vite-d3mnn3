import { EventEmitter } from './EventEmitter';

export class ImagesLoader {
  constructor(total, threshold = 0, timeout = 2000) {
    this.timeout = timeout;
    this.threshold = threshold;
    this.total = total;
    this.loadedCount = 0;
    this.errorsCount = 0;
    this.progress = 0;
    this.emitter = new EventEmitter();
    this.maxProgress = 1;
    this.timeoutId = null;
  }

  load(src) {
    if (!this.timeoutId) {
      this.timeoutId = setTimeout(() => {
        console.log('aborted on timeout');
        this.handleAbort();
      }, this.timeout);
    }
    const image = new Image();
    image.src = src;
    image.onload = () => {
      this.handleLoad();
    };
    image.onerror = () => {
      this.handleError();
    };

    return image;
  }

  handleLoad() {
    this.loadedCount++;
    this.updateProgress();
    this.emitter.emit('progress', { progress: this.progress });
    if (this.progress >= this.maxProgress - this.threshold) {
      clearTimeout(this.timeoutId);
      this.emitter.emit('complete');
      this.emitter.unsubscribeAll();
    }
  }

  handleError() {
    this.errorsCount++;
    if (this.errorsCount / this.total >= this.threshold) {
      console.log('aborted on error');
      this.handleAbort();
    }
  }

  handleAbort() {
    this.emitter.emit('abort');
    this.emitter.unsubscribeAll();
  }

  updateProgress() {
    this.progress = this.loadedCount / this.total;
  }

  onComplete(cb) {
    this.emitter.subscribe('complete', cb);
  }
  onProgress(cb) {
    this.emitter.subscribe('progress', cb);
  }
  onAbort(cb) {
    this.emitter.subscribe('abort', cb);
  }
}
