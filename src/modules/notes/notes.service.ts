import { Inject, Injectable } from '@nestjs/common';
import { BaseServiceAbstract } from 'src/core/services/base/base.abstract.service';
import { Note } from './schemas/note.schema';
import { NotesRepositoryInterface } from 'src/core/repositories/interfaces/notes.interface';

@Injectable()
export class NotesService extends BaseServiceAbstract<Note> {
  constructor(
    @Inject('NotesRepositoryInterface')
    private readonly notesRepository: NotesRepositoryInterface,
  ) {
    super(notesRepository);
  }
}
