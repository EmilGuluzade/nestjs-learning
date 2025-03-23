import { IsArray, IsDateString, IsMilitaryTime, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateSongDto{

    

@IsString()
@IsNotEmpty()
readonly title: string;


@IsNotEmpty()
@IsArray()
@IsNumber({}, { each: true })
readonly artists;

@IsNotEmpty()
@IsMilitaryTime()
readonly duration: Date;

@IsString()
@IsNotEmpty()
@IsDateString()
readonly releasedDate: Date;


@IsString()
@IsOptional()
readonly  lyrics: string;
}