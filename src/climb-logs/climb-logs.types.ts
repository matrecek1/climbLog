import { IsDefined, MinLength, MaxLength, IsString, IsNumber, Min, Max, IsNotEmpty, IsOptional } from "class-validator";


export class createClimbLogDto {
    @IsNotEmpty()
    climberId: number;
    @IsNotEmpty()
    boulderId: number;
}


export class climbLogUpdateDto {
    @IsOptional()
    boulderId: number;
    @IsOptional()
    climberId: number
}