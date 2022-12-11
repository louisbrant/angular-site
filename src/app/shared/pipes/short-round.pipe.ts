import {Pipe, PipeTransform} from "@angular/core";
import {SHORT_GROUPS} from "src/app/shared/variables/groups";

@Pipe({name: 'shortRound'})
export class ShortRoundPipe implements PipeTransform {
  transform(value: number, name: string): string {
    if (value == 11) {
      if (name.includes('-')) {
        let stage: any = name.split('-').map(name => name.trim());
        stage = stage[0].includes('Olympics') || stage[0].includes('ATP Finals') ? stage[1] : stage[0]
        if (stage.includes('Champion')) {
          const temp = stage.split(' ')
          stage = temp[0].includes('The') ? temp[1] : temp[0]
        }
        return stage;
      }
      let stage = name.split(' ');
      return stage[0].includes('The') ? stage[1] : stage[0]
    }
    return SHORT_GROUPS[value]
  }
}
