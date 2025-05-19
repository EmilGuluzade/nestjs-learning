import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";


export class UpdatePlaylistDto {
     @IsOptional()
      @IsString()
    readonly  name: string;
      
      @IsOptional()
      @IsArray()
      @IsNumber({}, { each: true })   
      readonly  songs: number[];
  
      @IsOptional()
      @IsNumber()
      readonly user: number;
}