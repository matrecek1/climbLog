import { IsDefined, MinLength, MaxLength, IsString, IsNumber, Min, Max, IsNotEmpty, IsOptional } from "class-validator";


export class CreateClimberDto {
    @IsNotEmpty()
    firstName:string;
    @IsNotEmpty()
    lastName:string;
    @IsNotEmpty()
    surname:string;
}


export class ClimberUpdateDto {
    @IsOptional()
    firstName?: string;
    @IsOptional()
    lastName?: string;
    @IsOptional()
    surname?: string;
}