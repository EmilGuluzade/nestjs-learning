import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateSongDto{



@IsString()
@IsOptional()
readonly title: string;


@IsOptional()
@IsArray()
@IsNumber({}, { each: true })
readonly artists;

@IsOptional()
@IsMilitaryTime()
readonly duration: Date;

@IsOptional()
@IsDateString()
readonly releasedDate: Date;


@IsString()
@IsOptional()
readonly  lyrics: string;
}