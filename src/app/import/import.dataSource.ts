import { DataSource } from '@angular/cdk/collections';
import { ImportService } from './import.service';
import { Observable } from 'rxjs/Observable';
import { Import } from './import';

export class ImportDataSource extends DataSource<any> {
    
    constructor(private importSer: ImportService) {
        super();
    }

    connect(): Observable<Import[]> {
        return this.importSer.getAll();
    }

    disconnect() {}
}