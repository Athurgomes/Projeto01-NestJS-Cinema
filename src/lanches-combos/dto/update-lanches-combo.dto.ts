import { PartialType } from '@nestjs/swagger';
import { CreateLanchesComboDto } from './create-lanches-combo.dto';

export class UpdateLanchesComboDto extends PartialType(CreateLanchesComboDto) {}
