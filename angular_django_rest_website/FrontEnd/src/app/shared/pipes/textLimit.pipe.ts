import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'limitpipe',
  pure: true,
})
export class LimitPipe {
  transform(value: any, args?: any): any {
    if (value.split(' ').length < args.length) return value
    else return value.split(' ').splice(0, args.length).join(' ') + args.cocat
  }
}
