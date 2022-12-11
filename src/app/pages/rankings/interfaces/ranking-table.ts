import {TemplateRef} from "@angular/core";

export interface RankingTableInterface {
  header: TemplateRef<any>;
  body: TemplateRef<any>;
  filters?: TemplateRef<any>[];
}
