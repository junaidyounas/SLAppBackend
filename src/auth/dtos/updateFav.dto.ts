import { ApiProperty } from '@nestjs/swagger';

export class UpdateFavDto {
  @ApiProperty()
  postId: string;

  @ApiProperty()
  isFav: boolean;
}
