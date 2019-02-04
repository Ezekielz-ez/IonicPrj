import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';

@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {
  //
  constructor(private mediaProvider: MediaProvider) {}
  transform(value: number, size: string) {
    return this.mediaProvider.getFileThumbnail(value, size);
  }
}
