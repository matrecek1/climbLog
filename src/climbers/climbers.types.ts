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
    @IsNotEmpty()
    firstName?: string;
    @IsOptional()
    @IsNotEmpty()
    lastName?: string;
    @IsOptional()
    @IsNotEmpty()
    surname?: string;
}