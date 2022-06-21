import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name:'search'
})
export class SearchPipe implements PipeTransform {
    transform(questers: string[], searchInput: string): any[]{
        if(!searchInput) {
            return  [];
        }
       searchInput = searchInput.toLowerCase();
       return questers.filter(
           x =>x.toLowerCase().includes(searchInput)
       )
     }
}
